FROM node:14.17.5
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install
EXPOSE 3000