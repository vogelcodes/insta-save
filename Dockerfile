FROM node:16

RUN apt-get update
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y


USER node
RUN mkdir -p /home/node/app
ENV PORT 3000
ENV NODE_ENV=production

WORKDIR /home/node/app

COPY package.json /home/node/app
COPY yarn.lock /home/node/app

# Production use node instead of root

RUN yarn install --production

COPY . /home/node/app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]