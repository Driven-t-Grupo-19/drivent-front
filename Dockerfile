FROM node:16
WORKDIR /usr/src/drivent
COPY ./package*.json ./
COPY ./.husky ./
RUN npm install -f
COPY . .
