#!/bin/bash

enter="$(journalctl -u valheim --since today | grep -c "Got connection SteamID")"
left="$(journalctl -u valheim --since today | grep -c "Closing socket")"
player="$(($enter-$left))"
echo "Currently $player playing"
