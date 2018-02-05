FROM node:8.9-alpine
ENV NODE_ENV production
RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD npm start