# install deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# build
FROM node:20-alpine AS builder
WORKDIR /app

# get ENV from Railway
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG DB_HOST
ARG DB_NAME
ARG DB_PASSWORD
ARG DB_USER

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_USER=$DB_USER

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm","start"]