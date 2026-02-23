import { spawnAsync } from "../utils/spawnAsync.js";

export async function lockPdf(
  inputPath: string,
  outputPath: string,
  userPassword: string,
  ownerPassword: string
): Promise<void> {
  await spawnAsync("qpdf", [
    "--encrypt",
    userPassword,
    ownerPassword,
    "256",
    "--",
    inputPath,
    outputPath,
  ]);
}
