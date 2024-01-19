FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]