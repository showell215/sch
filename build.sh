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
cp -r src/css dist/
cp -r src/img dist/
# simple hash on the JS file for cache busting
[[ $TRAVIS_BUILD_NUMBER ]] && cache_hash=_$TRAVIS_BUILD_NUMBER
index_file=index$cache_hash.min.js
uglifyjs -m -c toplevel=false,unused=false --verbose --warn ./src/scripts/vendor/*.js ./src/scripts/*.js -o ./dist/$index_file --source-map url="$index_file.map"
# uglifyjs -m -c toplevel=false,unused=false --verbose --warn ./src/scripts/vendor/*.js  -o ./dist/polyfill.min.js



sed -i.bak 's/{{index_file}}/'"${index_file}"'/' dist/index.html && rm dist/index.html.bak
