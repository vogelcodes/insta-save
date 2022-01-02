FROM node:alpine

RUN mkdir -p /home/node/app
ENV PORT 3000

WORKDIR /home/node/app

COPY package.json /home/node/app

# Production use node instead of root
USER node

RUN npm install

COPY . /home/node/app

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]