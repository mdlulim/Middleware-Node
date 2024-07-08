#!/bin/bash
set -e

sed -i "s,https://registry.yarnpkg.com/,$NPM_REGISTRY,g" yarn.lock