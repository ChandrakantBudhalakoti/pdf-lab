import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

import { errorMiddleware } from "./utils/errorMiddleware.js";
import { mergeRouter } from "./routes/merge.js";
import { splitRouter } from "./routes/split.js";
import { compressRouter } from "./routes/compress.js";
import { pdfToJpgRouter } from "./routes/pdfToJpg.js";
import { jpgToPdfRouter } from "./routes/jpgToPdf.js";
import { watermarkRouter } from "./routes/watermark.js";
import { lockRouter } from "./routes/lock.js";
import { unlockRouter } from "./routes/unlock.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
const OUTPUTS_DIR = path.join(__dirname, "..", "outputs");

const app = express();
const PORT = process.env.PORT || 4000;
const API_BASE = process.env.API_BASE || "http://localhost:4000";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(limiter);

app.use("/uploads", express.static(UPLOADS_DIR));
app.use("/outputs", express.static(OUTPUTS_DIR));

app.use("/api/merge", mergeRouter);
app.use("/api/split", splitRouter);
app.use("/api/compress", compressRouter);
app.use("/api/pdf-to-jpg", pdfToJpgRouter);
app.use("/api/jpg-to-pdf", jpgToPdfRouter);
app.use("/api/watermark", watermarkRouter);
app.use("/api/lock", lockRouter);
app.use("/api/unlock", unlockRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorMiddleware);

async function ensureDirs() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(OUTPUTS_DIR, { recursive: true });
}

ensureDirs().then(() => {
  app.listen(PORT, () => {
    console.log(`PDF Lab API running at http://localhost:${PORT}`);
  });
});
