import path from "path";
import { spawnAsync } from "../utils/spawnAsync.js";

export async function splitPdf(
  inputPath: string,
  outputDir: string,
  outputBase: string
): Promise<string[]> {
  const outputPattern = path.join(outputDir, `${outputBase}-%d.pdf`);
  await spawnAsync("qpdf", ["--split-pages", inputPath, "--", outputPattern]);
  const fs = await import("fs/promises");
  const files = await fs.readdir(outputDir);
  return files
    .filter((f) => f.startsWith(outputBase) && f.endsWith(".pdf"))
    .sort()
    .map((f) => path.join(outputDir, f));
}
