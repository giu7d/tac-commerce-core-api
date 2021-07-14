FROM node:lts-stretch

WORKDIR /usr/app
COPY . .

RUN npm install
RUN npm run build

CMD node build/index.js