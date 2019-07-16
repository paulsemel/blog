FROM node:12-slim

RUN apt update && \
    apt upgrade -y && \
    apt install -y build-essential python-dev musl-dev libvips-dev git ssh libgl-dev --no-install-recommends && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g gatsby

RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

RUN mkdir -p /app
WORKDIR /app

COPY . ./

RUN npm install

RUN gatsby build

EXPOSE 9000

CMD gatsby serve -H 0.0.0.0
