FROM node:alpine
WORKDIR /usr/src/whatodo-server
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]
#CMD ["npm", "run", "dev"]