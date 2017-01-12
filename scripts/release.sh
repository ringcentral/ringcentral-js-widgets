#!/usr/bin/env bash

#clone latest branch
git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b latest release
npm run release

cd release

if [[ $(git status -s) != '' ]]
  then
  git config user.email "integrations@ringcentral.com"
  git config user.name "RingCentral Integrations Team"
  git add --all .
  git commit -m "released at $(date)"
  git push origin latest -f
fi
