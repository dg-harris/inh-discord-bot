#!/bin/bash

#enter="$(journalctl -b -u valheim | grep -c ": Got connection SteamID")"
enter="$(grep -o -i ": Got connection SteamID" /home/kvamme/logs/valheim_log.txt | wc -l)"
#left="$(journalctl -b -u valheim | grep -c ": Closing socket")"
left="$(grep -o -i ": Closing socket" /home/kvamme/logs/valheim_log.txt | wc -l)"
player="$(($enter-$left))"
echo "Currently $player players"
