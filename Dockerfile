
FROM node:latest
LABEL Name=playoff_svr Version=0.0.1 
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install --production
COPY ./dist /usr/src/app
EXPOSE 8090
CMD npm start
