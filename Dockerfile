FROM node:14

WORKDIR /app

COPY ./ /app

RUN npm ci

EXPOSE 8080

CMD [ "node", "--require", "ts-node/register", "src/index.ts" ]
