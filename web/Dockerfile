FROM node:18-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copying package.json and package-lock.json
COPY web/package.json web/package-lock.json ./ 

# Installing dependencies
RUN npm ci --legacy-peer-deps

# Copying every other file
COPY web/ ./

# Using docker confings
RUN mv tsconfig.docker.json tsconfig.json
RUN mv i18n.docker.js i18n.js

# Getting shared files
COPY /prisma ./prisma
COPY /shared-data ./shared-data
COPY /i18n ./i18n

RUN mv i18n locales

# Setting up env files
ARG POSTGRES_DATABASE_URL
ENV POSTGRES_DATABASE_URL=${POSTGRES_DATABASE_URL}

ARG REDIS_DATABASE_URL
ENV REDIS_DATABASE_URL=${REDIS_DATABASE_URL}

ENV IS_DOCKER_BUILD 1

# Setting node mood to production
ENV NODE_ENV production

# Disableing Next telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Generating prisma
RUN npm run prisma-generate

# Changing user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Changing file ownership to the unprivileged user
RUN chown nextjs:nodejs .
RUN chown nextjs:nodejs -R ./prisma
RUN chown nextjs:nodejs -R ./shared-data
RUN chown nextjs:nodejs -R ./locales
RUN chown nextjs:nodejs -R ./public
RUN chown nextjs:nodejs -R ./src
RUN chown nextjs:nodejs -R ./pages

# Changing the user to nextjs
USER nextjs

# Exposing port
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "docker-start"]