FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
# COPY . .
VOLUME [ "/compressed" ]
CMD [ "nodemon", "-L", "/usr/src/app/server.js" ]
# CMD [ "node", "server.js" ]
