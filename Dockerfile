FROM node:16.7
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install
EXPOSE 3000
