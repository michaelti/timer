FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm run build
COPY . .
CMD npm start
EXPOSE 3000
