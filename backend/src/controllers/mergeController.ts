import { Request, Response } from "express";
import path from "path";
import { mergePdfs } from "../services/mergeService.js";
import { safeDeleteMany } from "../utils/fileUtils.js";
import { AppError } from "../utils/errorMiddleware.js";
import { getOutputFilename } from "../utils/outputFilename.js";

const OUTPUTS_DIR = path.join(process.cwd(), "outputs");
const API_BASE = process.env.API_BASE || "http://localhost:4000";

export async function mergeHandler(req: Request, res: Response): Promise<void> {
  const files = req.files as { files?: Express.Multer.File[] };
  const pdfFiles = files?.files;

  if (!pdfFiles?.length || pdfFiles.length < 2) {
    throw new AppError("At least 2 PDF files required", 400);
  }

  const inputPaths = pdfFiles.map((f) => f.path);
  const firstName = pdfFiles[0].originalname;
  const outputName = getOutputFilename(firstName, "pdf");
  const outputPath = path.join(OUTPUTS_DIR, outputName);

  try {
    await mergePdfs(inputPaths, outputPath);
    const downloadUrl = `${API_BASE}/outputs/${outputName}`;
    res.json({ success: true, downloadUrl, filename: outputName });
  } finally {
    await safeDeleteMany(inputPaths);
  }
}
