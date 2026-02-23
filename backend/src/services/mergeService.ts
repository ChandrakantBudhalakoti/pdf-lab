import path from "path";
import { spawnAsync } from "../utils/spawnAsync.js";

export async function mergePdfs(
  inputPaths: string[],
  outputPath: string
): Promise<void> {
  const args = ["--empty", "--pages", ...inputPaths, "--", outputPath];
  await spawnAsync("qpdf", args);
}
