#!/usr/bin/env bash

rm -rf gh-pages
git clone git@github.com:ringcentral/ringcentral-js-widget.git -b gh-pages gh-pages &> /dev/null
rm -r gh-pages/*
rm -r gh-pages/.babelrc
rm -r gh-pages/.gitignore
rm -r gh-pages/.jscsrc

npm run build

cd gh-pages

if [[ $(git status -s) != '' ]]
  then
  git config user.email "integrations@ringcentral.com" &> /dev/null
  git config user.name "RingCentral Integrations Team" &> /dev/null
  git add --all . &> /dev/null
  git commit -m "released at $(date)" &> /dev/null
  git push origin gh-pages -f &> /dev/null
fi
