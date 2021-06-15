#!/bin/bash

mkdir "/home/kvamme/Save/Zomboid/$(date +"%d-%m-%Y")"
cp "/home/kvamme/Zomboid/Saves/Multiplayer/servertest" "/home/kvamme/Save/Zomboid/$(date +"%d-%m-%Y")"

sudo systemctl start zomboid

echo "Project Zomboid is currently" $(systemctl is-active zomboid)
