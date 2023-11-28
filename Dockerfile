FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV production

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
