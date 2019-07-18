#!/bin/sh

pm2 -i max start npm -- run serve
trap : TERM INT; `while sleep 3600; do :; done` & wait
