#!/bin/sh

pm2 -i max start npm -- run serve
trap : TERM INT; sleep infinity & wait
