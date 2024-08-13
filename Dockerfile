FROM node:22

# ARGs
ARG NODE_ENV=production
ARG MIDTRANS_SERVER_KEY
ARG SUPABASE_URL
ARG SUPABASE_API_KEY
ARG PORT
ARG ONGKIR_URL
ARG ONGKIR_API_KEY

# ENVs
ENV NODE_ENV=$NODE_ENV
ENV MIDTRANS_SERVER_KEY=$MIDTRANS_SERVER_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_API_KEY=$SUPABASE_API_KEY
ENV PORT=$PORT
ENV ONGKIR_URL=$ONGKIR_URL
ENV ONGKIR_API_KEY=$ONGKIR_API_KEY

RUN apt-get update \
    && apt-get install -y \
    libnss3 \
    libx11-xcb-dev \
    libgbm-dev \
    libatk1.0-0 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libxshmfence1 \
    libxtst6 \
    xauth \
    xvfb \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install puppeteer

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
