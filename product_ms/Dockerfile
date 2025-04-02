FROM node:20.15.1

WORKDIR /app/shop_ms

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]