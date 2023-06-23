FROM node:14

WORKDIR /app

COPY ./web/package*.json ./
COPY ./web/server.js .
RUN npm install

EXPOSE 80

CMD ["node", "server.js"]