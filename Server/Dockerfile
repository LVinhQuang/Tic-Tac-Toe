FROM node:18-alpine
WORKDIR /Server/app
COPY . .
RUN ls -la
RUN yarn install --production
CMD ["node", "index.js"]
EXPOSE 443