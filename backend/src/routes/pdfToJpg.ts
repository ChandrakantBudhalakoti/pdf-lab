import { Router } from "express";
import { singlePdfMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { pdfToJpgHandler } from "../controllers/pdfToJpgController.js";

export const pdfToJpgRouter = Router();
pdfToJpgRouter.post("/", singlePdfMulter, asyncHandler(pdfToJpgHandler));
