import { Router } from "express";
import { pdfMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { mergeHandler } from "../controllers/mergeController.js";

export const mergeRouter = Router();
mergeRouter.post("/", pdfMulter, asyncHandler(mergeHandler));
