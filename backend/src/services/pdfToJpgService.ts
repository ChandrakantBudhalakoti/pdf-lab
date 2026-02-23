import path from "path";
import fs from "fs/promises";
import { spawnAsync } from "../utils/spawnAsync.js";

export async function pdfToJpg(
  inputPath: string,
  outputDir: string,
  outputBase: string
): Promise<string[]> {
  const outputPattern = path.join(outputDir, `${outputBase}-%d.jpg`);
  await spawnAsync("magick", [
    "convert",
    "-density",
    "150",
    inputPath,
    outputPattern,
  ]);
  const files = await fs.readdir(outputDir);
  return files
    .filter((f) => f.startsWith(outputBase) && (f.endsWith(".jpg") || f.endsWith(".jpeg")))
    .sort()
    .map((f) => path.join(outputDir, f));
}
