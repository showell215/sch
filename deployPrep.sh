#!/usr/bin/env bash

. build.sh
cp static.json dist
# cd dist
sed -i 's/dist/#dist/' \.gitignore
# git add  dist/
# git commit -m deployment
cd dist
# # git subtree push -f --prefix dist heroku master
# git push heroku `git subtree split --prefix dist master`:master --force
# sed -i '' 's/#dist/dist/' \.gitignore