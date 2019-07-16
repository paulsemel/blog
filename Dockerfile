FROM alpine:latest

RUN apk add -u nodejs npm
RUN npm install -g gatsby
