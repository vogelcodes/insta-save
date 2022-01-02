FROM node:16


USER node
RUN mkdir -p /home/node/app
ENV PORT 3000
ENV NODE_ENV=production

WORKDIR /home/node/app

COPY package.json /home/node/app
COPY yarn.lock /home/node/app


COPY . /home/node/app/

EXPOSE 3000
CMD [ "yarn", "start" ]