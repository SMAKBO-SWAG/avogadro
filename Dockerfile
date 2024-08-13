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

RUN apt-get update
RUN apt-get install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
