FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update

EXPOSE 3001

CMD ["npm", "start"] 