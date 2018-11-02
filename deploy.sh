#!/usr/bin/env bash

. build.sh
cp static.json dist
git add static.json
git add --force dist
git commit -m deployment
git subtree push --prefix dist heroku master