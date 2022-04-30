FROM node
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm i
EXPOSE 8080
CMD ["npm", "run", "serve"]