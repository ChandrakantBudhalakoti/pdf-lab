import { Router } from "express";
import { singlePdfMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { unlockHandler } from "../controllers/unlockController.js";

export const unlockRouter = Router();
unlockRouter.post("/", singlePdfMulter, asyncHandler(unlockHandler));
