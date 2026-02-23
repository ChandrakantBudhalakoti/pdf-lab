import { Request, Response } from "express";
import path from "path";
import { pdfToJpg } from "../services/pdfToJpgService.js";
import { safeDelete } from "../utils/fileUtils.js";
import { AppError } from "../utils/errorMiddleware.js";
import { getOutputBase } from "../utils/outputFilename.js";

const OUTPUTS_DIR = path.join(process.cwd(), "outputs");
const API_BASE = process.env.API_BASE || "http://localhost:4000";

export async function pdfToJpgHandler(req: Request, res: Response): Promise<void> {
  const file = (req.files as { file?: Express.Multer.File[] })?.file?.[0];
  if (!file) throw new AppError("PDF file required", 400);

  const inputPath = file.path;
  const outputBase = getOutputBase(file.originalname);

  try {
    const outputPaths = await pdfToJpg(inputPath, OUTPUTS_DIR, outputBase);
    const baseUrl = `${API_BASE}/outputs`;
    const files = outputPaths.map((p) => ({
      filename: path.basename(p),
      downloadUrl: `${baseUrl}/${path.basename(p)}`,
    }));
    res.json({ success: true, files });
  } finally {
    await safeDelete(inputPath);
  }
}
