# ── Stage 1: Builder (Dev + Build) ─────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# ── Stage 2: Dev Runner (used in compose dev) ──────
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "run", "dev"]