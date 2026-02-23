import { spawnAsync } from "../utils/spawnAsync.js";
import { getGhostscriptCommand } from "../utils/cliCommands.js";

export async function compressPdf(
  inputPath: string,
  outputPath: string
): Promise<void> {
  const gs = getGhostscriptCommand();
  const args = [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    "-dPDFSETTINGS=/screen", // 72 dpi - max compression
    "-dDownsampleColorImages=true",
    "-dColorImageResolution=72",
    "-dDownsampleGrayImages=true",
    "-dGrayImageResolution=72",
    "-dDownsampleMonoImages=true",
    "-dMonoImageResolution=72",
    "-dDetectDuplicateImages=true",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    `-sOutputFile=${outputPath}`,
    inputPath,
  ];
  await spawnAsync(gs, args);
}
