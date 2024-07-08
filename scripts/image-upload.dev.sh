#!/bin/bash
set -e

: ${VERSION?VERSION is Required}

scp server-${VERSION}.tar admciaranl@172.19.76.119:/home/admciaranl/
scp server-${VERSION}.tar admciaranl@172.19.76.120:/home/admciaranl/
scp server-${VERSION}.tar admciaranl@172.19.76.121:/home/admciaranl/

ssh admciaranl@172.19.76.119 sudo /opt/deploy/image-load.sh $VERSION
ssh admciaranl@172.19.76.120 sudo /opt/deploy/image-load.sh $VERSION
ssh admciaranl@172.19.76.121 sudo /opt/deploy/image-load.sh $VERSION

ssh admciaranl@172.19.76.119 sudo /opt/deploy/deploy.sh $VERSION