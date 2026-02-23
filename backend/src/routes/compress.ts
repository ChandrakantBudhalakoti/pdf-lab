import { Router } from "express";
import { singlePdfMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { compressHandler } from "../controllers/compressController.js";

export const compressRouter = Router();
compressRouter.post("/", singlePdfMulter, asyncHandler(compressHandler));
