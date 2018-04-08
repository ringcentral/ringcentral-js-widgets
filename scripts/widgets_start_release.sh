#!/usr/bin/env bash

# cd release/ringcentral-widgets

if [[ $(git status -s) != '' ]]
  then
  git config user.email "integrations@ringcentral.com" &> /dev/null
  git config user.name "RingCentral Integrations Team" &> /dev/null
  git add --all . &> /dev/null
  git commit -m "released at $(date), commit: $TRAVIS_COMMIT" &> /dev/null
  git push origin widgets-release -f &> /dev/null
fi
