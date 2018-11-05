#!/usr/bin/env bash

LINT_EXIT_CODE=0

eslint src/scripts/*.js
(( LINT_EXIT_CODE += $?))
htmlhint index.html
(( LINT_EXIT_CODE += $?))
stylelint src/css
(( LINT_EXIT_CODE += $?))

if [ $LINT_EXIT_CODE -ne 0 ]; then
    exit 1
fi


if [ -d dist ]; then
  rm -r dist
fi

mkdir dist
cp index.html dist/
uglifyjs -m -c toplevel=false,unused=false --verbose --warn ./src/scripts/*.js -o ./dist/index.min.js
uglifyjs -m -c toplevel=false,unused=false --verbose --warn ./vendor/js/*.js -o ./dist/polyfill.min.js
cp -r src/css dist/
cp -r vendor/css dist/
cp -r src/img dist/
