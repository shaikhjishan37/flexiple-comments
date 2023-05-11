FROM keymetrics/pm2:12-alpine
VOLUME /tmp
RUN mkdir /app
WORKDIR /app

RUN npm install
RUN yarn build
RUN yarn add express cors 
RUN yarn add elastic-apm-node

COPY /build /app
COPY server.js /app
COPY entrypoint.sh /app

CMD ["sh", "entrypoint.sh"]
