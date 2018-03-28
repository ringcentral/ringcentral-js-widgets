#!/usr/bin/env bash

#clone latest branch
git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b latest release &> /dev/null
npm run release

cd release

if [[ $(git status -s) != '' ]]
  then
  git config user.email "integrations@ringcentral.com" &> /dev/null
  git config user.name "RingCentral Integrations Team" &> /dev/null
  git add --all . &> /dev/null
  git commit -m "released at $(date)" &> /dev/null
  git push origin latest -f &> /dev/null
fi
