FROM node:hydrogen-alpine3.15
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]