# PDF Lab – Deployment Guide

## Overview

PDF Lab has two parts to deploy:

1. **Backend** – Express API (needs qpdf, Ghostscript, ImageMagick → use **Docker**)
2. **Frontend** – Next.js app (e.g. Vercel, Netlify)

---

## Environment Variables (Production)

### Backend

| Variable      | Required | Example                          | Description                     |
|---------------|----------|----------------------------------|---------------------------------|
| `PORT`        | No       | `4000`                           | Server port (platform may set)  |
| `API_BASE`    | Yes      | `https://api.yourdomain.com`     | Public backend URL for downloads|
| `FRONTEND_URL`| Yes      | `https://yourdomain.com`         | CORS origin (frontend URL)      |
| `NODE_ENV`    | No       | `production`                     | Environment mode                |

### Frontend

| Variable               | Required | Example                          | Description              |
|------------------------|----------|----------------------------------|--------------------------|
| `NEXT_PUBLIC_API_URL`  | Yes      | `https://api.yourdomain.com`     | Backend API base URL     |

---

## Option 1: Railway (Backend + Frontend)

**Backend:**
1. Create a new project at [railway.app](https://railway.app)
2. Add a service → **Deploy from GitHub** → select repo
3. Set **Root Directory**: `./` (or leave empty)
4. Add **Dockerfile** in project root (see below) or use `backend/` as root and ensure Dockerfile path
5. Configure:
   - **Build Command**: (Docker handles this)
   - **Start Command**: (Docker handles this)
6. Add env vars: `API_BASE`, `FRONTEND_URL`

**Frontend:**
1. Add another service → **Deploy from GitHub**
2. Root Directory: `./` (or create a monorepo config)
3. Framework: Next.js (auto-detected)
4. Add env: `NEXT_PUBLIC_API_URL=https://your-backend.railway.app`

**Note:** For backend on Railway, use the existing Dockerfile. Set Railway to use the Dockerfile (it should auto-detect). The Dockerfile path assumes build context is repo root; it copies `backend/` into the image.

---

## Option 2: Render

**Backend (Docker):**
1. [Render](https://render.com) → New → **Web Service**
2. Connect repo
3. **Environment**: Docker
4. Dockerfile path: `Dockerfile` (in repo root)
5. Env vars: `API_BASE`, `FRONTEND_URL`

**Frontend:**
1. New → **Static Site** or **Web Service**
2. Build command: `npm install && npm run build`
3. Publish directory: `.next` (for Web Service) or use their Next.js blueprint
4. Env: `NEXT_PUBLIC_API_URL`

---

## Option 3: Fly.io (Backend only, or full stack)

**Backend:**
```bash
cd pdf-lab
fly launch
# Select region, create app
fly secrets set API_BASE=https://your-app.fly.dev
fly secrets set FRONTEND_URL=https://your-frontend.vercel.app
fly deploy
```

Use the existing Dockerfile; Fly will build from it.

**Frontend:** Deploy to Vercel (see Option 4).

---

## Option 4: Vercel (Frontend) + Backend elsewhere

**Frontend:**
1. [Vercel](https://vercel.com) → Import repo
2. Framework: Next.js
3. Root: `./` (project root)
4. Environment variable:
   - `NEXT_PUBLIC_API_URL` = your backend URL (e.g. `https://pdf-lab-api.railway.app`)

**Backend:** Deploy to Railway, Render, Fly.io, or DigitalOcean using the Dockerfile.

---

## Option 5: Single VPS (Docker Compose)

On a VPS (DigitalOcean, Linode, etc.):

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - API_BASE=https://api.yourdomain.com
      - FRONTEND_URL=https://yourdomain.com
    restart: unless-stopped

  frontend:
    image: node:20-alpine
    working_dir: /app
    command: sh -c "npm install && npm run build && npm start"
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:4000
    depends_on:
      - backend
```

Or run frontend on Vercel and only deploy the backend container.

---

## Dockerfile Notes

The existing `Dockerfile` in the project root builds the backend:

- Base: `node:20-alpine`
- Installs: qpdf, ghostscript, imagemagick
- Copies `backend/` and builds
- Runs `node dist/server.js` on port 4000

**Build context** must be the **project root** (parent of `backend/`):

```bash
docker build -f Dockerfile -t pdf-lab-backend .
```

---

## Deployment Checklist

- [ ] Set `API_BASE` to the **public** backend URL (for download links)
- [ ] Set `FRONTEND_URL` to the frontend URL (for CORS)
- [ ] Set `NEXT_PUBLIC_API_URL` to the backend URL (used by the browser)
- [ ] Use `https://` in all production URLs
- [ ] Backend deployed via Docker (qpdf, Ghostscript, ImageMagick must be installed)

---

## CORS

The backend uses:

```ts
cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" })
```

Set `FRONTEND_URL` to your deployed frontend origin (e.g. `https://pdf-lab.vercel.app`). For multiple origins (www + non-www, preview URLs), you’d need to change this to an array or allowlist.

---

## File Storage

Uploads and outputs are stored on the server filesystem. On platforms with ephemeral disks (e.g. Railway, Render free tier), files may be lost on restart. For production:

1. Add a cleanup job for old outputs, or
2. Use object storage (S3, R2) for outputs and stream downloads from there.
