FROM node:14

ENV PORT=5000

ENV NODE_ENV production

RUN apt update && apt install -y netcat

WORKDIR /var/www

# Копируем wait-for
COPY utils/wait-for.sh wait-for.sh

# даём ему прав на запуск
RUN chmod +x wait-for.sh

COPY ./dist dist

COPY ./index.js .

COPY ./package.json .

COPY ./tsconfig.json .

RUN npm i --only=prod && npm run build

EXPOSE $PORT

#CMD node index.js
