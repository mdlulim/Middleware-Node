#!/bin/sh
set -e

# Always run in UTC
export TZ=utc

if [ $# -lt 1 ]
then
  echo "Usage : server|worker|migrate|rollback|seed|clean"
  exit
fi

case "$1" in

server)  echo "Starting server"
    node --async-stack-traces ./src/commands/express.js "$@"
    ;;
server-debug)  echo "Starting server (debug)"
    node --inspect=0.0.0.0:9229 --async-stack-traces ./src/commands/express.js "$@"
    ;;
worker)  echo  "Starting worker"
    node --async-stack-traces ./src/commands/bull.js "$@"
    ;;
migrate)  echo  "Running knex migrations"
    node --async-stack-traces ./node_modules/knex/bin/cli.js migrate:latest "$@"
    ;;
seed) echo  "Running knex seed"
   node --async-stack-traces ./node_modules/knex/bin/cli.js seed:run "$@"
   ;;
rollback) echo  "Running knex rollback"
   node --async-stack-traces ./node_modules/knex/bin/cli.js migrate:rollback "$@"
   ;;
rollback) echo  "Running clean"
   node --async-stack-traces ./src/commands/clean.js "$@"
   ;;
*) echo "Invalid Command $1"
    exit -1
   ;;
esac