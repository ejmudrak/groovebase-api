# https://nodejs.org/en/docs/guides/nodejs-docker-webapp

FROM node:lts-alpine as dev

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3030

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]