FROM node:16

RUN mkdir -p /home/node/app
ENV PORT 3000

WORKDIR /home/node/app

COPY package.json /home/node/app

# Production use node instead of root
USER node

 RUN sudo chmod -R 777 /home/node

RUN npm install

COPY . /home/node/app

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]