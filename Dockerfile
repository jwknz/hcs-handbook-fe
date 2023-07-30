FROM --platform=linux/amd64 node:18-alpine3.17
LABEL Maintainer="Jeff Kranenburg <jwkranenburg@icloud.com>"
LABEL Description="Frontend for HCS Handbook"

WORKDIR /app

COPY ./package.json .

RUN npm i --silent

COPY . .

EXPOSE 80

CMD [ "npm", "run", "host" ]