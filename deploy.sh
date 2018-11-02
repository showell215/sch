#!/usr/bin/env bash

. build.sh
cp static.json dist
git add --force dist
git commit -m deployment
git subtree push -f --prefix dist heroku master