import { Router } from "express";
import { singlePdfMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { lockHandler } from "../controllers/lockController.js";

export const lockRouter = Router();
lockRouter.post("/", singlePdfMulter, asyncHandler(lockHandler));
