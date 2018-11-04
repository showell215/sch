#!/usr/bin/env bash
. build.sh
cp static.json dist
sed -i 's/dist/#dist/' \.gitignore
cd dist
