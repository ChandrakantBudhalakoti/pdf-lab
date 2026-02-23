import { spawnAsync } from "../utils/spawnAsync.js";

export async function watermarkPdf(
  inputPath: string,
  watermarkPath: string,
  outputPath: string
): Promise<void> {
  await spawnAsync("qpdf", [
    inputPath,
    "--overlay",
    watermarkPath,
    "--",
    outputPath,
  ]);
}
