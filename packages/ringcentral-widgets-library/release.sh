#!/usr/bin/env bash

rm -rf ./build
yarn build

cd ./build

git init
git add .
git commit -m "released at $(date)"
git remote add origin https://github.com/MicleMing/ringcentral-js-widgets.git
git push origin master:gh-pages
