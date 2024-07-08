#!/bin/bash
set -e

: ${VERSION?VERSION is Required}

docker pull registry.gitlab.com/stackworx.io/bluelabel/mobile-application-server/server:$VERSION

docker save -o server-${VERSION}.tar registry.gitlab.com/stackworx.io/bluelabel/mobile-application-server/server:$VERSION