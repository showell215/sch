#!/usr/bin/env bash

. build.sh
cp static.json dist
sed -i '' 's/dist/#dist/' \.gitignore
git add --force dist/
git commit -m deployment
# git subtree push -f --prefix dist heroku master
git push heroku `git subtree split --prefix dist master`:master --force
sed -i '' 's/#dist/dist/' \.gitignore