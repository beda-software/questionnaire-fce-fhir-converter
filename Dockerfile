FROM node:22-slim

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

ENV PORT=3000
CMD ["yarn", "start"]
