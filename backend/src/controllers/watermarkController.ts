import { Request, Response } from "express";
import path from "path";
import { watermarkPdf } from "../services/watermarkService.js";
import { safeDeleteMany } from "../utils/fileUtils.js";
import { AppError } from "../utils/errorMiddleware.js";
import { getOutputFilename } from "../utils/outputFilename.js";

const OUTPUTS_DIR = path.join(process.cwd(), "outputs");
const API_BASE = process.env.API_BASE || "http://localhost:4000";

export async function watermarkHandler(req: Request, res: Response): Promise<void> {
  const files = req.files as { file?: Express.Multer.File[]; watermark?: Express.Multer.File[] };
  const pdfFile = files?.file?.[0];
  const watermarkFile = files?.watermark?.[0];

  if (!pdfFile) throw new AppError("PDF file required", 400);
  if (!watermarkFile) throw new AppError("Watermark PDF required", 400);

  const inputPath = pdfFile.path;
  const watermarkPath = watermarkFile.path;
  const outputName = getOutputFilename(pdfFile.originalname, "pdf");
  const outputPath = path.join(OUTPUTS_DIR, outputName);

  try {
    await watermarkPdf(inputPath, watermarkPath, outputPath);
    const downloadUrl = `${API_BASE}/outputs/${outputName}`;
    res.json({ success: true, downloadUrl, filename: outputName });
  } finally {
    await safeDeleteMany([inputPath, watermarkPath]);
  }
}
