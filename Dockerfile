FROM node:22-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

ENV PORT=3000
CMD ["yarn", "start"]
