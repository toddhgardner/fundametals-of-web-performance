#!/bin/sh
# Deployment Tool
# Fundamentals of Web Performance
#
# Bash helper script to send our current changes out to the example server
# during the workshop.
#
cd "$(dirname "$0")"
cd ..

# Load environment variables
. .env

green='\033[0;32m'
clear='\033[0m'
bold=$(tput bold)
normal=$(tput sgr0)

# Create a Tarball of the current local committed source
rm -rf ./dist
mkdir ./dist
git archive --format=tar.gz -o ./dist/deploy.tar.gz HEAD
printf "${green}${bold}Package Created${normal}${clear} /dist/deploy.tar.gz\n"

# Upload the tarball to the host server
rsync ./dist/deploy.tar.gz $HOST:/srv/node/devstickers/temp/
printf "${green}${bold}Uploaded to Host${normal}${clear}\n"

# Swap the new content
ssh $HOST > /dev/null << EOF
  tar xf /srv/node/devstickers/temp/deploy.tar.gz -C /srv/node/devstickers/app
  cd /srv/node/devstickers/app
  npm install --omit=dev
  rm -rf /srv/node/devstickers/temp
EOF
printf "${green}${bold}Package Deployed${normal}${clear}\n"

# Purge CDN Cache
curl --request POST \
     --url "https://api.bunny.net/pullzone/${BUNNY_PULL_ZONE}/purgeCache" \
     --header "AccessKey: ${BUNNY_ACCESS_KEY}" \
     --header "Content-Type: application/json"
printf "${green}${bold}CDN Cache Purged${normal}${clear}\n\n"