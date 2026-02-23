import { Router } from "express";
import { singlePdfMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { splitHandler } from "../controllers/splitController.js";

export const splitRouter = Router();
splitRouter.post("/", singlePdfMulter, asyncHandler(splitHandler));
