# PDF Lab – Local Setup Guide (Beginner Friendly)

This guide walks you through running PDF Lab on your computer. No prior experience needed—just follow each step.

---

## What You’ll Need

1. **Node.js** (version 20 or newer)  
   - Download: https://nodejs.org/  
   - Pick the **LTS** version.

2. **System tools** (for PDF features):
   - **qpdf** – merge, split, lock/unlock PDFs  
   - **Ghostscript** – compress PDFs  
   - **ImageMagick** – PDF ↔ image conversion  

   Install instructions are in the [System Dependencies](#system-dependencies) section.

---

## Step 1: Install Node.js

1. Go to https://nodejs.org/ and download the **LTS** installer.  
2. Run the installer and follow the prompts.  
3. Verify the install by opening a terminal (PowerShell on Windows) and running:

   ```powershell
   node --version
   npm --version
   ```

   You should see something like `v20.x.x` and `10.x.x`.

---

## Step 2: Open the Project Folder

1. Open your terminal (PowerShell, Command Prompt, or Git Bash on Windows).  
2. Navigate to the project folder:

   ```powershell
   cd e:\Trigital\pdf-lab
   ```

   Replace `e:\Trigital\pdf-lab` with your actual project path if different.

---

## Step 3: Install Dependencies

Run this once to install all dependencies for both frontend and backend:

```powershell
npm install
npm install --prefix backend
npm install --prefix frontend
```

---

## Step 4: Configure Environment Files

### Backend

1. Go to the `backend` folder.  
2. Copy `.env.example` to `.env`:

   ```powershell
   cd backend
   copy .env.example .env
   cd ..
   ```

   The default values in `.env` are usually fine for local use.

### Frontend

1. Go to the `frontend` folder.  
2. Copy `.env.example` to `.env.local`:

   ```powershell
   cd frontend
   copy .env.example .env.local
   cd ..
   ```

   This tells the frontend where your backend API runs (`http://localhost:4000`).

---

## Step 5: Run Both Backend and Frontend

You need **two terminals** so backend and frontend can run at the same time.

**Terminal 1 – Backend**

```powershell
cd e:\Trigital\pdf-lab
npm run dev:backend
```

Wait until you see something like: `Server running on port 4000`

**Terminal 2 – Frontend**

```powershell
cd e:\Trigital\pdf-lab
npm run dev:frontend
```

Wait until you see something like: `ready - started server on 0.0.0.0:3000`

---

## Step 6: Use the App

1. Open your browser.  
2. Go to: **http://localhost:3000**  
3. You should see the PDF Lab interface.  
4. Use any tool (Merge, Split, Compress, etc.).  
5. The backend runs on **http://localhost:4000**; the frontend talks to it automatically.

---

## System Dependencies (CLI Tools)

PDF Lab uses these tools. Install them once on your system.

### Windows (Chocolatey)

If you have [Chocolatey](https://chocolatey.org/):

```powershell
choco install qpdf ghostscript imagemagick
```

### Windows (Manual)

1. **qpdf**: https://sourceforge.net/projects/qpdf/  
2. **Ghostscript**: https://ghostscript.com/releases/gsdnld.html  
3. **ImageMagick**: https://imagemagick.org/script/download.php  
4. Add their installation paths to your system PATH.

### Verify Installation

```powershell
qpdf --version
gs --version
magick --version
```

If these commands work, you’re set. If one fails, that tool isn’t installed correctly or not on your PATH.

---

## URLs Quick Reference

| Service   | URL                    |
|----------|------------------------|
| Frontend | http://localhost:3000  |
| Backend  | http://localhost:4000  |

---

## Troubleshooting

### "Port 3000 is already in use"

Another app is using port 3000. Close it or stop that app, then run the frontend again.

### "Port 4000 is already in use"

Same idea for the backend. Stop whatever is using port 4000.

### "Cannot find module" errors

Reinstall dependencies:

```powershell
cd e:\Trigital\pdf-lab
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Frontend can’t reach the backend

1. Check that the backend is running and shows something like `Server running on port 4000`.  
2. Check that `frontend/.env.local` has:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

### PDF tools don’t work (merge, compress, etc.)

Install and verify qpdf, Ghostscript, and ImageMagick as described in [System Dependencies](#system-dependencies).

---

## Stopping the App

In each terminal where backend or frontend is running, press:

```
Ctrl + C
```

---

## Summary Checklist

- [ ] Node.js 20+ installed  
- [ ] Dependencies installed (`npm install` + backend + frontend)  
- [ ] Backend `.env` and frontend `.env.local` created  
- [ ] System tools installed (qpdf, Ghostscript, ImageMagick)  
- [ ] Backend running (`npm run dev:backend`)  
- [ ] Frontend running (`npm run dev:frontend`)  
- [ ] Browser open at http://localhost:3000  
