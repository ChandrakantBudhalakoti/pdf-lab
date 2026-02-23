import { Router } from "express";
import { watermarkMulter } from "../utils/multerConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { watermarkHandler } from "../controllers/watermarkController.js";

export const watermarkRouter = Router();
watermarkRouter.post("/", watermarkMulter, asyncHandler(watermarkHandler));
