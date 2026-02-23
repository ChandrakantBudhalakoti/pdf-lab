import { Request, Response } from "express";
import path from "path";
import { jpgToPdf } from "../services/jpgToPdfService.js";
import { safeDeleteMany } from "../utils/fileUtils.js";
import { AppError } from "../utils/errorMiddleware.js";
import { getOutputFilename } from "../utils/outputFilename.js";

const OUTPUTS_DIR = path.join(process.cwd(), "outputs");
const API_BASE = process.env.API_BASE || "http://localhost:4000";

export async function jpgToPdfHandler(req: Request, res: Response): Promise<void> {
  const files = req.files as { files?: Express.Multer.File[] };
  const imageFiles = files?.files;

  if (!imageFiles?.length) throw new AppError("At least 1 image required", 400);

  const inputPaths = imageFiles.map((f) => f.path);
  const outputName = getOutputFilename(imageFiles[0].originalname, "pdf");
  const outputPath = path.join(OUTPUTS_DIR, outputName);

  try {
    await jpgToPdf(inputPaths, outputPath);
    const downloadUrl = `${API_BASE}/outputs/${outputName}`;
    res.json({ success: true, downloadUrl, filename: outputName });
  } finally {
    await safeDeleteMany(inputPaths);
  }
}
