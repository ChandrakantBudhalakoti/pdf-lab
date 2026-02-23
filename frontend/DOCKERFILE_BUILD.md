# Docker Build Fix for Frontend

If the frontend Docker build fails with `useContext` or key warnings:

1. **Ensure NODE_ENV** in Dockerfile before build:
   ```
   ENV NODE_ENV=production
   RUN npm ci && npm dedupe && npm run build
   ```

2. **Use `--omit=dev`** instead of `npm install` for smaller installs (optional).

3. **Run `npm dedupe`** after install to prevent multiple React instances.

4. **Node version**: Use Node 20.19+ or 22.13+ (see engine warning).
