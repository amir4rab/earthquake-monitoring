FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat

# Setting workdir
WORKDIR /app

# Copying package.json and lock files
COPY app/package.json app/pnpm-lock.yaml* ./

# Installing PNPM
RUN npm install pnpm --location=global

# Installing dependencies
RUN pnpm install --frozen-lockfile

# Copying main file
COPY app/ .

# Copying other file
COPY prisma/ ./prisma
COPY /shared-data ./shared-data
COPY i18n/ ../i18n

# Renaming tsconfig file
RUN mv tsconfig.docker.json tsconfig.json

# Setting env to production
ENV NODE_ENV production

# Setting up env files
ARG VITE_NEXT_API_ROUTE
ENV VITE_NEXT_API_ROUTE=${VITE_NEXT_API_ROUTE}

# Bulding
RUN pnpm run pwa-build-docker

FROM nginx AS hoster

# Copying files from builder
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist ./usr/share/nginx/html