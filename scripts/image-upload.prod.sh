#!/bin/bash
set -e

: ${VERSION?VERSION is Required}

scp server-${VERSION}.tar admciaranl@172.19.70.142:/home/admciaranl/
scp server-${VERSION}.tar admciaranl@172.19.70.143:/home/admciaranl/
scp server-${VERSION}.tar admciaranl@172.19.70.144:/home/admciaranl/

ssh admciaranl@172.19.70.142 sudo /opt/deploy/image-load.sh $VERSION
ssh admciaranl@172.19.70.143 sudo /opt/deploy/image-load.sh $VERSION
ssh admciaranl@172.19.70.144 sudo /opt/deploy/image-load.sh $VERSION

ssh admciaranl@172.19.70.142 sudo /opt/deploy/deploy.sh $VERSION