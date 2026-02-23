import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "./errorMiddleware.js";
import { validateFileType, MAX_FILE_SIZE } from "./fileUtils.js";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

function createMulter(allowedExt: string[], fieldNames: string[]) {
  return multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_req, file, cb) => {
      if (!validateFileType(file.originalname, allowedExt)) {
        return cb(new AppError(`Invalid file type. Allowed: ${allowedExt.join(", ")}`, 400));
      }
      cb(null, true);
    },
  }).fields(fieldNames.map((name) => ({ name, maxCount: 10 })));
}

export const pdfMulter = createMulter([".pdf"], ["files"]);
export const singlePdfMulter = createMulter([".pdf"], ["file"]);
export const imageMulter = createMulter([".jpg", ".jpeg"], ["files"]);
export const singleImageMulter = createMulter([".jpg", ".jpeg"], ["file"]);
export const watermarkMulter = createMulter([".pdf"], ["file", "watermark"]);
