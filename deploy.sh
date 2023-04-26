#!/bin/bash

cd dist

# init
git init

# git add
git add --a

# git commit
git commit -m "deploy"

# git push
git push -f git@github.com:lidengkedev/example-exam.git master:gh-pages

# remove
rm -rf .git

# cd
cd -