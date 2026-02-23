# PDF Lab – Backend Documentation

## Overview

The backend is a Node.js + Express API that powers all PDF operations. It uses CLI tools (qpdf, Ghostscript, ImageMagick) to process files, with no cloud APIs or paid SDKs.

---

## Project Structure

```
backend/
├── src/
│   ├── server.ts              # Entry point, Express app setup
│   ├── routes/                # API route definitions
│   │   ├── merge.ts
│   │   ├── split.ts
│   │   ├── compress.ts
│   │   ├── pdfToJpg.ts
│   │   ├── jpgToPdf.ts
│   │   ├── watermark.ts
│   │   ├── lock.ts
│   │   └── unlock.ts
│   ├── controllers/           # Request handlers
│   │   ├── mergeController.ts
│   │   ├── splitController.ts
│   │   ├── compressController.ts
│   │   ├── pdfToJpgController.ts
│   │   ├── jpgToPdfController.ts
│   │   ├── watermarkController.ts
│   │   ├── lockController.ts
│   │   └── unlockController.ts
│   ├── services/              # CLI execution logic
│   │   ├── mergeService.ts
│   │   ├── splitService.ts
│   │   ├── compressService.ts
│   │   ├── pdfToJpgService.ts
│   │   ├── jpgToPdfService.ts
│   │   ├── watermarkService.ts
│   │   ├── lockService.ts
│   │   └── unlockService.ts
│   └── utils/
│       ├── errorMiddleware.ts
│       ├── fileUtils.ts
│       ├── multerConfig.ts
│       ├── spawnAsync.ts
│       ├── asyncHandler.ts
│       ├── outputFilename.ts
│       └── cliCommands.ts
├── uploads/                   # Temporary upload storage (auto-created)
├── outputs/                   # Processed files for download (auto-created)
├── package.json
├── tsconfig.json
└── .env.example
```

---

## How It Works

### Request Flow

```
Client (FormData) → Multer (upload) → Route → Controller → Service (CLI) → Response (download URL)
                                              ↓
                                         Cleanup (delete temp files)
```

1. **Multer** stores uploaded files in `uploads/` with UUID filenames.
2. **Controller** validates input, calls the service, builds the response.
3. **Service** runs the CLI tool (qpdf, gs, magick) via `spawn()`.
4. **Controller** deletes temporary uploads and returns download URLs.
5. **Client** fetches files from `/outputs/{filename}` (static serving).

### CLI Tools Used

| Tool      | CLI                 | Purpose                    |
|-----------|---------------------|----------------------------|
| Merge     | qpdf                | Combine multiple PDFs      |
| Split     | qpdf                | Extract pages to separate files |
| Compress  | Ghostscript (gs)    | Reduce PDF file size       |
| PDF→JPG   | ImageMagick         | Convert PDF pages to images |
| JPG→PDF   | ImageMagick         | Convert images to PDF      |
| Watermark | qpdf                | Overlay PDF on each page   |
| Lock      | qpdf                | Add password protection    |
| Unlock    | qpdf                | Remove password            |

### Platform Detection

- **Ghostscript**: On Windows uses `gswin64c` (64-bit) or `gswin32c` (32-bit); on Unix uses `gs`.
- Implemented in `utils/cliCommands.ts`.

---

## How to Build

### Prerequisites

- Node.js 18+
- System tools: qpdf, Ghostscript, ImageMagick

### Install Dependencies

```bash
cd backend
npm install
```

### Development (with hot reload)

```bash
npm run dev
```

Runs `tsx watch src/server.ts` so changes trigger a restart.

### Production Build

```bash
npm run build
```

Compiles TypeScript to JavaScript in `dist/` using `tsc`.

### Production Start

```bash
npm start
```

Runs `node dist/server.js`. Ensure `dist/` exists (`npm run build`).

---

## Build Process (TypeScript)

`tsconfig.json`:

- **target**: ES2022
- **module**: NodeNext (ES modules)
- **moduleResolution**: NodeNext
- **outDir**: `./dist`
- **rootDir**: `./src`

Imports use `.js` extensions for ESM compatibility.

---

## API Endpoints

| Method | Endpoint        | Body/Form Fields              | Response                     |
|--------|-----------------|-------------------------------|------------------------------|
| POST   | /api/merge      | `files` (2+ PDFs)             | `{ downloadUrl, filename }`  |
| POST   | /api/split      | `file` (1 PDF)                | `{ files: [{ filename, downloadUrl }] }` |
| POST   | /api/compress   | `file` (1 PDF)                | `{ downloadUrl, filename }`  |
| POST   | /api/pdf-to-jpg | `file` (1 PDF)                | `{ files: [...] }`           |
| POST   | /api/jpg-to-pdf | `files` (1+ images)           | `{ downloadUrl, filename }`  |
| POST   | /api/watermark  | `file` (PDF), `watermark` (PDF) | `{ downloadUrl, filename }` |
| POST   | /api/lock       | `file`, `userPassword`, `ownerPassword` | `{ downloadUrl, filename }` |
| POST   | /api/unlock     | `file`, `password`            | `{ downloadUrl, filename }`  |
| GET    | /api/health     | -                             | `{ status, timestamp }`      |
| GET    | /outputs/:file  | -                             | File download (static)       |

---

## Output Filenames

Outputs use the pattern: `{original-basename}-pdf-lab.{ext}`

- Single-file tools: `document-pdf-lab.pdf`
- Split: `document-pdf-lab-1.pdf`, `document-pdf-lab-2.pdf`, ...
- PDF→JPG: `document-pdf-lab-1.jpg`, `document-pdf-lab-2.jpg`, ...

Defined in `utils/outputFilename.ts`.

---

## Security

- **File type validation**: Only `.pdf`, `.jpg`, `.jpeg`.
- **Size limit**: 25MB per file (Multer).
- **Rate limiting**: 100 requests per 15 minutes.
- **CLI safety**: Uses `spawn()` with argument arrays (no shell injection).
- **Cleanup**: Temporary uploads deleted after each request.
- **CORS**: Origin from `FRONTEND_URL` env var.

---

## Environment Variables

| Variable     | Default                  | Description                    |
|-------------|---------------------------|--------------------------------|
| PORT        | 4000                      | Server port                    |
| API_BASE    | http://localhost:4000     | Base URL for download links    |
| FRONTEND_URL| http://localhost:3000     | Allowed CORS origin            |
| NODE_ENV    | development               | Environment mode               |

---

## Error Handling

- **AppError**: Custom error with `statusCode` and `message`.
- **errorMiddleware**: Central handler, returns JSON `{ error: message }`.
- **asyncHandler**: Wraps async controllers so rejections go to `errorMiddleware`.
