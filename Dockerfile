FROM node:16 AS build

RUN apt-get update
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

USER node

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
USER node

RUN yarn install

COPY . /usr/src/app


RUN yarn build

FROM node:16-alpine

ENV NODE_ENV=production

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app


COPY --from=build /usr/src/app app  


EXPOSE 3000
CMD [ "yarn", "start" ]