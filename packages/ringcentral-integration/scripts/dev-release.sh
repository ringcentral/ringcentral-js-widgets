#!/usr/bin/env bash

yarn run gulp release
cd release

if [[ $(git status -s) != '' ]]
  then
  git add --all .
  git commit -m "released at $(date)"
  git push origin dev-latest -f
fi
