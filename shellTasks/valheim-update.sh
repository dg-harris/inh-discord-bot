#!/bin/bash

function log () {
    if [[ $_V -eq 1 ]]; then
        echo "$@"
    fi
}

#enter="$(journalctl -b -u valheim | grep -c ": Got connection SteamID")"
#left="$(journalctl -b -u valheim | grep -c ": Closing socket")"
#player="$(($enter-$left))"

#if [ $player -ne 0 ]; then
#  echo "Error, cannot restart when people are playing. Currently $player playing."
#exit
#fi

v1=$(sudo systemctl stop valheim 2> /dev/null)

v2=$(steamcmd +login anonymous +force_install_dir /home/kvamme/Valheim +app_update 896660 validate +exit 2> /dev/null)

v3=$(sudo systemctl start valheim 2> /dev/null)

echo "$v1 $v2 $v3"
