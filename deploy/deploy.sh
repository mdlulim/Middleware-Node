#!/bin/bash
set -e

if [[ -z $1 ]];
then
    echo "Version not provided"
    exit -1
fi

export VERSION=$1

cd /opt/deploy

docker stack deploy --compose-file docker-compose.yml --with-registry-auth web
