FROM node:18-alpine
WORKDIR /app
COPY . .
RUN ls -la
RUN yarn install --production
CMD ["node", "index.js"]
EXPOSE 443