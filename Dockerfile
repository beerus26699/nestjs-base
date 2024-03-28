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

#################################
# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CMD [ "npm", "run", "start:dev" ]