#!/bin/bash
set -e

if [[ -z $1 ]];
then
    echo "Version not provided"
    exit -1
fi

export VERSION=$1

cd /opt/deploy

docker load -i /home/admciaranl/server-${VERSION}.tar
