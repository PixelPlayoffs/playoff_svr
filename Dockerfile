
FROM node:6-alpine
LABEL Name=playoff_svr Version=0.0.1 
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install --production
COPY ./dist .
EXPOSE 8090
CMD npm start
