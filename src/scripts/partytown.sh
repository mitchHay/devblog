#!/bin/bash

DIR=$(dirname -- "$( readlink -f -- "$0"; )";)

cd $DIR
cd ../

# Run partytown lib installation

echo "Installing partytown libraries..."

npm run partytown

echo "Partytown libraries installed successfully..."

# HACK: Currently ctrl/cmd + R will cause partytown to crash in nextjs
# See issue: https://github.com/BuilderIO/partytown/issues/107
echo "Copying templated partytown sandbox html file"

cp ./scripts/templates/partytown-sandbox-sw.html ./public/~partytown
cp ./scripts/templates/partytown-sandbox-sw.html ./public/~partytown/debug
