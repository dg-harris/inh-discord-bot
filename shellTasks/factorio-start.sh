#!/bin/bash

mkdir "/home/kvamme/Save/Factorio/$(date +"%d-%m-%Y")"
cp "/opt/factorio/saves/server.zip" "/home/kvamme/Save/Factorio/$(date +"%d-%m-%Y")/server/zip"

sudo systemctl start factorio

echo "Factorio is currently" $(systemctl is-active factorio)
