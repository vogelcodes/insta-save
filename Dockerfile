FROM node:16 AS build

RUN apt-get update
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

USER node

RUN mkdir -p /home/node/app
ENV PORT 3000

WORKDIR /home/node/app

COPY package.json /home/node/app
COPY yarn.lock /home/node/app

# Production use node instead of root
USER node

RUN yarn install

COPY . /home/node/app


RUN yarn build

FROM node:16-alpine

ENV NODE_ENV=production

COPY package.json /home/node/app
COPY yarn.lock /home/node/app


COPY --from=build /home/node/app app  


EXPOSE 3000
CMD [ "yarn", "start" ]