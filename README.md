# PDF Lab

An open-source PDF tools platform for merging, splitting, compressing, converting, and securing PDFs. All processing runs locally using CLI tools—no cloud APIs or paid SDKs.

## Features

| Tool | Description |
|------|-------------|
| **Merge PDF** | Combine multiple PDFs into one |
| **Split PDF** | Extract each page into separate files |
| **Compress PDF** | Reduce file size (Ghostscript) |
| **PDF → JPG** | Convert PDF pages to images |
| **JPG → PDF** | Convert images to a single PDF |
| **Watermark PDF** | Overlay a PDF watermark on each page |
| **Lock PDF** | Add password protection |
| **Unlock PDF** | Remove password protection |

## System Dependencies

Install these CLI tools before running PDF Lab:

### macOS (Homebrew)

```bash
brew install qpdf ghostscript imagemagick
```

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install qpdf ghostscript imagemagick
```

### Windows

> **Note:** Ghostscript on Windows uses `gswin64c` (64-bit) or `gswin32c` (32-bit). PDF Lab automatically uses the correct executable.

1. **qpdf**: Download from [qpdf sourceforge](https://sourceforge.net/projects/qpdf/) or use Chocolatey: `choco install qpdf`
2. **Ghostscript**: Download from [ghostscript.com](https://ghostscript.com/releases/gsdnld.html) or `choco install ghostscript`
3. **ImageMagick**: Download from [imagemagick.org](https://imagemagick.org/script/download.php) or `choco install imagemagick`
4. Add installation paths to your system PATH

Verify installations:

```bash
qpdf --version
gs --version
magick --version
```

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd pdf-lab
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # optional, edit if needed
npm run dev
```

Backend runs at `http://localhost:4000`.

### 3. Frontend

```bash
# from project root
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`.

### 4. Open

Visit [http://localhost:3000](http://localhost:3000) and use any PDF tool.

## Project Structure

```
pdf-lab/
├── backend/           # Express API
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/   # qpdf, Ghostscript, ImageMagick
│   │   └── utils/
│   ├── uploads/
│   └── outputs/
├── app/               # Next.js App Router
├── components/
├── services/
└── types/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/merge | Merge PDFs (multipart: `files`) |
| POST | /api/split | Split PDF (multipart: `file`) |
| POST | /api/compress | Compress PDF (multipart: `file`) |
| POST | /api/pdf-to-jpg | PDF to JPG (multipart: `file`) |
| POST | /api/jpg-to-pdf | JPG to PDF (multipart: `files`) |
| POST | /api/watermark | Watermark (multipart: `file`, `watermark`) |
| POST | /api/lock | Lock PDF (multipart: `file`, body: `userPassword`, `ownerPassword`) |
| POST | /api/unlock | Unlock PDF (multipart: `file`, body: `password`) |

## Configuration

### Backend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 4000 | Server port |
| API_BASE | http://localhost:4000 | Public base URL for download links |
| FRONTEND_URL | http://localhost:3000 | CORS origin |

### Frontend (.env.local)

| Variable | Default | Description |
|----------|---------|-------------|
| NEXT_PUBLIC_API_URL | http://localhost:4000 | Backend API base URL |

## Security

- File type validation (.pdf, .jpg, .jpeg only)
- 25MB max file size
- Rate limiting (100 requests / 15 min)
- Temporary files deleted after processing
- CLI via `spawn()` with argument arrays (no shell injection)

## License

MIT
