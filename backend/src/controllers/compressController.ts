import { Request, Response } from "express";
import path from "path";
import { compressPdf } from "../services/compressService.js";
import { safeDelete } from "../utils/fileUtils.js";
import { AppError } from "../utils/errorMiddleware.js";
import { getOutputFilename } from "../utils/outputFilename.js";

const OUTPUTS_DIR = path.join(process.cwd(), "outputs");
const API_BASE = process.env.API_BASE || "http://localhost:4000";

export async function compressHandler(req: Request, res: Response): Promise<void> {
  const file = (req.files as { file?: Express.Multer.File[] })?.file?.[0];
  if (!file) throw new AppError("PDF file required", 400);

  const inputPath = file.path;
  const outputName = getOutputFilename(file.originalname, "pdf");
  const outputPath = path.join(OUTPUTS_DIR, outputName);

  try {
    await compressPdf(inputPath, outputPath);
    const downloadUrl = `${API_BASE}/outputs/${outputName}`;
    res.json({ success: true, downloadUrl, filename: outputName });
  } finally {
    await safeDelete(inputPath);
  }
}
