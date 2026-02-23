import { platform } from "os";

/**
 * Get the correct Ghostscript executable for the current platform.
 * Windows uses gswin64c (64-bit) or gswin32c (32-bit); Unix uses gs.
 */
export function getGhostscriptCommand(): string {
  if (platform() === "win32") {
    return process.arch === "x64" ? "gswin64c" : "gswin32c";
  }
  return "gs";
}
