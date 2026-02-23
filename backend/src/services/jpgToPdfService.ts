import { spawnAsync } from "../utils/spawnAsync.js";

export async function jpgToPdf(
  inputPaths: string[],
  outputPath: string
): Promise<void> {
  await spawnAsync("magick", ["convert", ...inputPaths, outputPath]);
}
