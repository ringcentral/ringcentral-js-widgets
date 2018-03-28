#!/usr/bin/env bash

# clone latest branch
git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b latest release &> /dev/null
npm run release

cd release
