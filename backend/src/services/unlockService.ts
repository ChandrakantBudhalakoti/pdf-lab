import { spawnAsync } from "../utils/spawnAsync.js";

export async function unlockPdf(
  inputPath: string,
  outputPath: string,
  password: string
): Promise<void> {
  await spawnAsync("qpdf", [
    "--decrypt",
    `--password=${password}`,
    "--",
    inputPath,
    outputPath,
  ]);
}
