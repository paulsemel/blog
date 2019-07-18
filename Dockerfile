FROM node:12-alpine

RUN apk add --no-cache python-dev musl-dev make g++ autoconf automake libtool && \
    npm install -g gatsby pm2

RUN mkdir -p /app
WORKDIR /app

COPY . ./

RUN npm install

RUN gatsby build

EXPOSE 9000

# There is currently a bug in pm2. This forces us to do this.
CMD exec /bin/bash run.sh
