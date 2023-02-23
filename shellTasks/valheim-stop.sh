#!/bin/bash

#if [ $player -ne 0 ]; then
#  echo "Error, cannot stop when people are playing. Currently $player playing."
#exit
#fi

enter="$(grep -o -i ": Got connection SteamID" /home/kvamme/logs/valheim_log.txt | wc -l)"
left="$(grep -o -i ": Closing socket" /home/kvamme/logs/valheim_log.txt | wc -l)"

if [ $(($enter - $left)) -ne 0 ]; then
	echo "Cannot stop while people are playing!"
	exit
fi

sudo systemctl stop valheim

sudo systemctl stop logger

#curl -X POST 127.0.0.1:8080/valheimM -d '{"content": "Valheim is currently '"$(systemctl is-active valheim)"'."}'

echo "Valheim is currently" $(systemctl is-active valheim)
