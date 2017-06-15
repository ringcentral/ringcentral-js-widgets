#!/usr/bin/env bash

#clone latest branch
if [ ! -d release ]; then
  git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b latest release &> /dev/null
  echo 'start release build'
  npm run release
fi


cd docs
if [ ! -d gh-pages ]; then
  echo 'start docs elease build'
  yarn
  npm run build
fi
cd ../
