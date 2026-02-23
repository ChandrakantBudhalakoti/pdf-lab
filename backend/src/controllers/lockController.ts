import { Request, Response } from "express";
import path from "path";
import { lockPdf } from "../services/lockService.js";
import { safeDelete } from "../utils/fileUtils.js";
import { AppError } from "../utils/errorMiddleware.js";
import { getOutputFilename } from "../utils/outputFilename.js";

const OUTPUTS_DIR = path.join(process.cwd(), "outputs");
const API_BASE = process.env.API_BASE || "http://localhost:4000";

export async function lockHandler(req: Request, res: Response): Promise<void> {
  const file = (req.files as { file?: Express.Multer.File[] })?.file?.[0];
  const { userPassword, ownerPassword } = req.body as { userPassword?: string; ownerPassword?: string };

  if (!file) throw new AppError("PDF file required", 400);
  if (!userPassword?.trim()) throw new AppError("User password required", 400);

  const inputPath = file.path;
  const outputName = getOutputFilename(file.originalname, "pdf");
  const outputPath = path.join(OUTPUTS_DIR, outputName);
  const owner = ownerPassword?.trim() || userPassword;

  try {
    await lockPdf(inputPath, outputPath, userPassword, owner);
    const downloadUrl = `${API_BASE}/outputs/${outputName}`;
    res.json({ success: true, downloadUrl, filename: outputName });
  } finally {
    await safeDelete(inputPath);
  }
}
