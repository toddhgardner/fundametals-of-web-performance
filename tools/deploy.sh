#!/bin/sh
cd "$(dirname "$0")"
cd ..

rm -rf ./dist
mkdir ./dist
git archive --format=tar.gz -o ./dist/deploy.tar.gz HEAD

rsync ./dist/deploy.tar.gz root@206.189.9.176:/srv/node/devstickers/temp/

ssh -q root@206.189.9.176 << EOF
  tar xf /srv/node/devstickers/temp/deploy.tar.gz -C /srv/node/devstickers/app
  cd /srv/node/devstickers/app
  npm install --omit=dev
  rm -rf /srv/node/devstickers/temp
EOF