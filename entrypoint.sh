#!/bin/sh

cd /app

pm2 start server.js --no-daemon
