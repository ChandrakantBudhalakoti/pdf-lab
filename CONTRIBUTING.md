# Contributing to PDF Lab

Thank you for your interest in contributing to PDF Lab. This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

Be respectful and constructive. We welcome contributors of all skill levels and backgrounds.

## Getting Started

### Prerequisites

- **Node.js** 20.9.0 or later
- **CLI tools** (must be installed and on your PATH):
  - [qpdf](https://qpdf.sourceforge.io/)
  - [Ghostscript](https://ghostscript.com/)
  - [ImageMagick](https://imagemagick.org/)

**macOS (Homebrew):**
```bash
brew install qpdf ghostscript imagemagick
```

**Ubuntu / Debian:**
```bash
sudo apt update
sudo apt install qpdf ghostscript imagemagick
```

**Windows:** See [README.md](README.md#windows) for installation instructions.

Verify installations:
```bash
qpdf --version
gs --version
magick --version
```

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<owner>/pdf-lab.git
   cd pdf-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure environment**
   ```bash
   # Backend
   cp backend/.env.example backend/.env

   # Frontend
   cp frontend/.env.example frontend/.env.local
   ```
   Edit the `.env` and `.env.local` files if you need different ports or URLs.

4. **Run the app**
   - From the root: `npm run dev:backend` and `npm run dev:frontend` (in separate terminals)
   - Or from each directory: `cd backend && npm run dev` and `cd frontend && npm run dev`

   - Backend: http://localhost:4000  
   - Frontend: http://localhost:3000

## Project Structure

```
pdf-lab/
├── frontend/          # Next.js 16 (App Router), React 19
│   ├── app/
│   ├── components/
│   ├── services/
│   └── types/
├── backend/           # Express API (TypeScript)
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/   # qpdf, Ghostscript, ImageMagick wrappers
│   │   └── utils/
│   ├── uploads/       # Temporary uploads (gitignored)
│   └── outputs/       # Generated files (gitignored)
└── docs/
```

## Development Workflow

1. **Create a branch** from `main` for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or: fix/bug-description
   ```

2. **Make your changes** and keep commits focused and atomic.

3. **Format and lint** before committing:
   ```bash
   npm run format
   npm run format:check
   ```

4. **Ensure both apps build**:
   ```bash
   npm run build:backend
   npm run build:frontend
   ```

## Code Style

- **Prettier** is used for formatting. Run `npm run format` from the root to format all code.
- **TypeScript** is required. Avoid `any` where possible.
- **Security:** All PDF/image processing uses CLI tools via `spawn()` with argument arrays—never build shell commands from user input.

## Submitting Changes

1. **Push your branch** and open a Pull Request against `main`.

2. **Describe your changes** in the PR:
   - What problem does this solve?
   - How did you implement it?
   - Any breaking changes or migration steps?

3. **Keep PRs small** and scoped to one feature or fix. Larger changes may be split into multiple PRs.

4. **Respond to review feedback** promptly. Maintainers may request changes before merging.

### Adding a New PDF Tool

When adding a new tool (e.g., a new API endpoint):

1. Add a route in `backend/src/routes/`.
2. Add a controller and service in `backend/src/controllers/` and `backend/src/services/`.
3. Add the frontend page and form in `frontend/app/` and related components.
4. Update the API docs in [README.md](README.md#api-endpoints).
5. Follow existing patterns for file validation, size limits, and error handling.

### Reporting Bugs

- Open an issue with a clear title and description.
- Include steps to reproduce, expected vs actual behavior, and environment (OS, Node version, CLI tool versions).

### Suggesting Features

- Open an issue to discuss before implementing.
- Explain the use case and how it fits into the existing tools.

---

Thank you for contributing!
