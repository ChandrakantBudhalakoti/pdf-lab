# Prettier Configuration Guide

## Overview

This project uses **Prettier** for automatic code formatting. All team members must use the same Prettier configuration to avoid unnecessary conflicts and formatting changes.

## Configuration Files

- `.prettierrc` - Root configuration (shared by all)
- `.prettierignore` - Files/folders to ignore during formatting
- `frontend/.prettierrc` - Frontend-specific configuration
- `backend/.prettierrc` - Backend-specific configuration

## Prettier Settings

```json
{
  "semi": true, // Add semicolons at the end of statements
  "trailingComma": "es5", // Add trailing commas where valid in ES5
  "singleQuote": false, // Use double quotes
  "printWidth": 100, // Wrap lines at 100 characters
  "tabWidth": 2, // Use 2 spaces for indentation
  "useTabs": false, // Use spaces, not tabs
  "arrowParens": "always", // Always add parentheses around arrow function parameters
  "endOfLine": "lf" // Use Unix line endings
}
```

## How to Use

### Format All Files

```bash
# From root directory
npm run format

# Or individually
cd frontend && npm run format    # Format frontend only
cd backend && npm run format     # Format backend only
```

### Check Formatting (without applying changes)

```bash
# From root directory
npm run format:check

# Or individually
cd frontend && npm run format:check
cd backend && npm run format:check
```

### Auto-format on Save (VS Code)

1. Install the **Prettier - Code formatter** extension by Esben Petersen
2. Add to your VS Code settings (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.configPath": ".prettierrc"
}
```

### Auto-format on Commit (Husky + lint-staged - Optional)

If you want to automatically format files before committing:

```bash
npm install husky lint-staged --save-dev
npx husky install
```

Add to root `package.json`:

```json
{
  "lint-staged": {
    "**/*.{ts,tsx,js,json,css,md}": "prettier --write"
  }
}
```

## Important Notes

⚠️ **Do NOT change Prettier settings without team discussion** - Different versions or configurations will create merge conflicts.

✅ **Always run formatter before committing** - Use `npm run format` to ensure consistent code style.

✅ **Use consistent line endings** - This project uses `lf` (Unix line endings). Configure Git:

```bash
git config core.autocrlf false
```

## Troubleshooting

**Q: Why are there formatting changes in my commit?**
A: Run `npm run format` in the root directory before committing.

**Q: How do I force reformat the entire project?**
A: Run `npm run format` from the root directory.

**Q: Can I use single quotes instead of double quotes?**
A: No, the project is configured for double quotes. This is enforced by the `.prettierrc` config.

## Version Pinning

Prettier version is locked at **v3.2.5** in `package.json` to ensure all developers use the same version and avoid formatting drift.

If you need to update Prettier:

1. Discuss with the team
2. Update version in both `frontend/package.json` and `backend/package.json`
3. Run `npm install` in both directories
4. Format entire project: `npm run format`
5. Commit the changes together
