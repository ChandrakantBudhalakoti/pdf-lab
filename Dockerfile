# PDF Lab Backend
FROM node:20-alpine

# Install PDF tools
RUN apk add --no-cache qpdf ghostscript imagemagick

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

RUN mkdir -p uploads outputs

ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/server.js"]
