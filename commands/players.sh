#!/bin/bash

enter="$(journalctl -b -u valheim | grep -c "Got connection SteamID")"
left="$(journalctl -b -u valheim | grep -c "Closing socket")"
player="$(($enter-$left))"
echo "Currently $player playing"
