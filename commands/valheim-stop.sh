#!/bin/bash

if [ $player -ne 0 ]; then
  echo "Error, cannot stop when people are playing. Currently $player playing."
exit
fi

sudo systemctl stop valheim

echo "Valheim is currently" $(systemctl is-active valheim)
