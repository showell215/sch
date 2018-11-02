#!/usr/bin/env bash

if [ -d dist ]; then
  rm -r dist
fi

mkdir dist
cp index.html dist/
uglifyjs -cm --toplevel --verbose --warn ./src/scripts/*.js -o ./dist/index.min.js
uglifyjs -cm --toplevel --verbose --warn ./vendor/js/*.js -o ./dist/polyfill.min.js
cp -r src/css dist/
cp -r vendor/css dist/
cp -r src/img dist/
