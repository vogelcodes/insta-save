FROM node:16 AS build

RUN apt-get update
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

WORKDIR /usr/src/app
ENV PORT 3000



COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root

RUN yarn install

RUN yarn add prisma --dev

COPY . /usr/src/app

RUN yarn prisma generate

RUN yarn build

FROM node:16-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

COPY --from=build /usr/src/app /usr/src/app  


EXPOSE 3000
CMD [ "yarn", "start" ]