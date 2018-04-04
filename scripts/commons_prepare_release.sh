#!/usr/bin/env bash

#clone latest branch
if [ ! -d build ]; then
  mkdir build
fi
if [ ! -d release ]; then
  mkdir release
fi

cd release
if [ ! -d ringcentral-integration ]; then
  echo "Clone release branch..."
  # git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b commons-release ringcentral-integration &> /dev/null
fi
cd ../

echo "start release build"
lerna run release --scope ringcentral-integration --stream
