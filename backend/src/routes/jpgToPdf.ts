import { Router } from "express";
import { imageMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { jpgToPdfHandler } from "../controllers/jpgToPdfController.js";

export const jpgToPdfRouter = Router();
jpgToPdfRouter.post("/", imageMulter, asyncHandler(jpgToPdfHandler));
