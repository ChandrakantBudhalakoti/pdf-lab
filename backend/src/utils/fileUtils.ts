import fs from "fs/promises";
import path from "path";

export const ALLOWED_PDF = [".pdf"];
export const ALLOWED_IMAGES = [".jpg", ".jpeg"];
export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export function validateFileType(
  filename: string,
  allowed: string[]
): boolean {
  const ext = path.extname(filename).toLowerCase();
  return allowed.includes(ext);
}

export function validatePdf(filename: string): boolean {
  return validateFileType(filename, ALLOWED_PDF);
}

export function validateImage(filename: string): boolean {
  return validateFileType(filename, ALLOWED_IMAGES);
}

export async function safeDelete(filePath: string): Promise<void> {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch {
    // Ignore - file may not exist
  }
}

export async function safeDeleteMany(filePaths: string[]): Promise<void> {
  await Promise.all(filePaths.map(safeDelete));
}
