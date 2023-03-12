FROM node:lts-alpine
RUN apk add --no-cache libc6-compat
RUN apk update \
  && apk add openssl1.1-compat

WORKDIR /app

# Copying package.json and package-lock.json
COPY cronjob/package.json cronjob/package-lock.json ./ 

# Installing dependencies
RUN npm install

# Copying every other file
COPY cronjob/ ./

# Getting shared files
COPY /prisma ./prisma

# Setting up env files
ARG POSTGRES_DATABASE_URL
ENV POSTGRES_DATABASE_URL=${POSTGRES_DATABASE_URL}

ARG NEXT_JS_API_ROUTE
ENV NEXT_JS_API_ROUTE=${NEXT_JS_API_ROUTE}

ARG NEXT_JS_API_KEY
ENV NEXT_JS_API_KEY=${NEXT_JS_API_KEY}

# Setting node mood to production
ENV NODE_ENV production

# Generating prisma
RUN npm run prisma-generate

# Changing user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 cronjob

# Changing file ownership to the unprivileged user
RUN chown cronjob:nodejs .
RUN chown cronjob:nodejs -R ./prisma
RUN chown cronjob:nodejs -R ./src

# Changing the user to nextjs
USER cronjob

# Exposing port
EXPOSE 3030
ENV PORT 3030

CMD ["npm", "run", "docker-start"]