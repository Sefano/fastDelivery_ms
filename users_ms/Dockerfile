FROM node:20.15.1

WORKDIR /app/users_ms

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]