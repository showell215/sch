#!/usr/bin/env bash

if [ -d dist ]; then
  rm -r dist
fi

mkdir dist
cp index.html dist/
uglifyjs ./src/scripts/*.js -m -o ./dist/index.min.js
uglifyjs ./vendor/js/*.js  -m -o ./dist/polyfill.min.js
cp -r src/css dist/
cp -r vendor/css dist/
cp -r src/img dist/
