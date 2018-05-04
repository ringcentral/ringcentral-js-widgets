#!/usr/bin/env bash

if [[ $(git status -s) != '' ]]
  then
  git config user.email "u9520107@gmail.com" &> /dev/null
  git config user.name "Jack Tzu-Chieh Huang" &> /dev/null
  git add --all . &> /dev/null
  git commit -m "released at $(date)" &> /dev/null
  git push origin release -f &> /dev/null
fi
