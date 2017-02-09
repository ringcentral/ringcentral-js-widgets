#!/usr/bin/env bash

if [[ $(git status -s) != '' ]]
  then
  git config user.email "integrations@ringcentral.com" &> /dev/null
  git config user.name "RingCentral Integrations Team" &> /dev/null
  git add --all . &> /dev/null
  git commit -m "released at $(date)" &> /dev/null
  git push origin latest -f &> /dev/null
fi
