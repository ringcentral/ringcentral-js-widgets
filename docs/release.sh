#!/usr/bin/env bash

rm -rf gh-pages
git clone git@github.com:embbnux/ringcentral-js-widget.git -b gh-pages gh-pages &> /dev/null
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
