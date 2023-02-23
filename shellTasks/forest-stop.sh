#!/bin/bash
source "$(dirname "$BASH_SOURCE")/_messageFunctions.sh"

(cd ~/Forest/docker-the-forest-dedicated-server && ./stop.sh)
sendMessage "The Forest is stopping."
