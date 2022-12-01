FROM node:lts-alpine3.14

RUN mkdir /app
COPY package*.json /app

WORKDIR /app

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]