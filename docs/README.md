# PDF Lab Documentation

## Quick Links

- **[BACKEND.md](./BACKEND.md)** – Backend architecture, build, API, security
- **[FRONTEND.md](./FRONTEND.md)** – Frontend structure, build, components
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** – How to deploy to production

## Overview

PDF Lab is a full-stack PDF tools platform:

| Layer   | Stack                              |
|---------|------------------------------------|
| Backend | Node.js, Express, TypeScript       |
| Frontend| Next.js 16 (App Router), React 19, Tailwind 4 |
| CLI Tools | qpdf, Ghostscript, ImageMagick  |

## Quick Start

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
npm install && npm run dev
```

See [BACKEND.md](./BACKEND.md) and [FRONTEND.md](./FRONTEND.md) for detailed documentation.
