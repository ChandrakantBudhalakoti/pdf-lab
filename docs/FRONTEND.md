# PDF Lab – Frontend Documentation

## Overview

The frontend is a Next.js 16 application using the App Router. It provides a UI for all PDF tools with drag-and-drop upload, progress states, and downloads.

---

## Project Structure

```
pdf-lab/frontend/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Homepage with tool grid
│   ├── globals.css         # Tailwind imports, CSS variables
│   └── tools/              # Tool-specific pages
│       ├── merge/page.tsx
│       ├── split/page.tsx
│       ├── compress/page.tsx
│       ├── pdf-to-jpg/page.tsx
│       ├── jpg-to-pdf/page.tsx
│       ├── watermark/page.tsx
│       ├── lock/page.tsx
│       └── unlock/page.tsx
├── components/
│   ├── FileDropzone.tsx    # Drag & drop file input
│   ├── ToolLayout.tsx      # Layout wrapper for tool pages
│   ├── ToolPageClient.tsx  # Shared logic: upload, process, download
│   ├── DownloadButton.tsx  # Download action
│   └── ToolCard.tsx        # (optional) Card for tool grid
├── services/
│   └── api.ts              # API client (fetch wrapper)
├── types/
│   └── api.ts              # TypeScript types for API responses
├── public/                 # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── .env.local              # NEXT_PUBLIC_API_URL (in frontend/)
```

---

## How It Works

### Page Flow

```
Homepage (tool grid) → Tool page → FileDropzone → Process → Download
```

1. **Homepage** (`app/page.tsx`): Renders 8 tool cards linking to `/tools/{id}`.
2. **Tool page** (e.g. `app/tools/merge/page.tsx`): Uses `ToolLayout` + `ToolPageClient`.
3. **ToolPageClient**: Manages state, calls `FileDropzone`, submits via `uploadFiles()`, shows result and `DownloadButton`.

### Data Flow

```
User selects files → ToolPageClient state → FormData → uploadFiles(api.ts)
                                                            ↓
                                              fetch(POST /api/...)
                                                            ↓
                                              Response: { downloadUrl, filename }
                                                            ↓
                                              DownloadButton (anchor with downloadUrl)
```

### Component Hierarchy

```
ToolLayout
└── ToolPageClient
    ├── File list (when files selected)
    ├── FileDropzone (one or two for watermark)
    ├── Password inputs (lock/unlock)
    ├── Process button
    ├── Error message
    └── Success block + DownloadButton(s)
```

### API Client

`services/api.ts`:

- Uses `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).
- `uploadFiles(endpoint, formData)` sends a POST and parses JSON.
- On error, throws with `data.error` or status message.

---

## How to Build

### Prerequisites

- Node.js 18+
- Backend running (or `NEXT_PUBLIC_API_URL` pointed at deployed API)

### Install Dependencies

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Starts the Next.js dev server on `http://localhost:3000` with HMR.

### Production Build

```bash
npm run build
```

- Compiles TypeScript
- Bundles React
- Generates static/optimized output in `.next/`
- Builds static pages where possible

### Production Start

```bash
npm start
```

Runs the production server (must run `npm run build` first).

---

## Build Process

### Next.js

- **App Router**: File-based routing under `app/`.
- **React Server Components**: Default; client components use `"use client"`.
- **TypeScript**: Via `tsconfig.json`, path alias `@/*` → project root.

### Tailwind CSS 4

- Configured in `postcss.config.mjs` with `@tailwindcss/postcss`.
- Imported in `app/globals.css` via `@import "tailwindcss"`.
- Styles applied via utility classes (no separate config file in v4).

### Path Alias

```json
"paths": { "@/*": ["./*"] }
```

Example: `import { uploadFiles } from "@/services/api"`.

---

## Key Components

### ToolPageClient

- Handles file selection (single or multiple, append mode for merge/jpg-to-pdf).
- Manages loading, error, and result state.
- Builds `FormData` and calls `uploadFiles()`.
- Renders success block and download buttons based on `ApiResponse`.

Props: `endpoint`, `accept`, `multiple`, `maxCount`, `label`, `addMoreLabel`, `needsWatermark`, `needsPassword`, etc.

### FileDropzone

- Drag & drop + click to browse.
- Validates file type, count, and `maxCount`.
- In multi-file mode, supports adding files incrementally (merge, jpg-to-pdf).
- Calls `onFiles(files)` on valid selection.

### ToolLayout

- Shared layout for tool pages: header, logo, “All tools” link, title, description.
- Wraps tool content in a card-style container.

---

## Environment Variables

| Variable                | Default                  | Description              |
|-------------------------|--------------------------|--------------------------|
| NEXT_PUBLIC_API_URL     | http://localhost:4000    | Backend API base URL     |

Create `.env.local` in the `frontend/` folder for local overrides.

---

## Styling

- **Tailwind CSS 4**: Utility-first styling.
- **Colors**: Slate grays, red accent (`red-600`, `red-700`).
- **Layout**: Max-width containers, responsive grid.
- **Font**: Inter (from `next/font/google`).
- **Design**: Simple, similar to tools like iLovePDF.
