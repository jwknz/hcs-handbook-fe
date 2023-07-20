FROM node:18-alpine3.17

WORKDIR /app

COPY ./package.json .

RUN npm i --silent

COPY . .

EXPOSE 80

CMD [ "npm", "run", "host" ]