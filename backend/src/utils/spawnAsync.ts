import { spawn } from "child_process";
import { AppError } from "./errorMiddleware.js";

export function spawnAsync(
  command: string,
  args: string[],
  options?: { cwd?: string; timeout?: number }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      cwd: options?.cwd,
    });

    let stdout = "";
    let stderr = "";

    proc.stdout?.on("data", (data) => {
      stdout += data.toString();
    });
    proc.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    const timeout = options?.timeout ?? 60000;
    const timer = setTimeout(() => {
      proc.kill("SIGTERM");
      reject(new AppError("Processing timed out", 408));
    }, timeout);

    proc.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve();
      } else {
        const msg = stderr || stdout || `Process exited with code ${code}`;
        reject(new AppError(`Processing failed: ${msg.trim().slice(0, 200)}`, 500));
      }
    });

    proc.on("error", (err) => {
      clearTimeout(timer);
      reject(new AppError(`Failed to run ${command}: ${err.message}`, 500));
    });
  });
}
