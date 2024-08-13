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

RUN npm install -g @nestjs/cli

# RUN apt-get update && apt-get install -y \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libatk1.0-0 \
#     libcups2 \
#     libdbus-1-3 \
#     libx11-xcb1 \
#     libxcomposite1 \
#     libxdamage1 \
#     libxrandr2 \
#     libgbm1 \
#     libgtk-3-0 \
#     libpango-1.0-0 \
#     libpangocairo-1.0-0 \
#     libxshmfence1 \
#     libnss3 \
#     xdg-utils

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
