FROM node:14

ENV PORT=3000

WORKDIR /var/www

COPY ./dist dist

COPY ./package.json .

COPY ./server.js server.js

RUN npm i --only=prod

EXPOSE $PORT

CMD npm run server
