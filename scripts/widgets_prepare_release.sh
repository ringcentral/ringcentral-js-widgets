#!/usr/bin/env bash

#clone latest branch
if [ ! -d build ]; then
  mkdir build
fi
if [ ! -d release ]; then
  mkdir release
fi

cd release
if [ ! -d ringcentral-widgets ]; then
  # git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b widgets-release ringcentral-widgets &> /dev/null
fi
cd ../

echo 'start release build'
lerna run release --scope ringcentral-widgets --stream
