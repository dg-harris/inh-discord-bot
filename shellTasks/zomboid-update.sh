#!/bin/bash

echo "Updating Project Zomboid"
sudo systemctl stop zomboid
./home/kvamme/Zomboid/update.sh
sudo systemctl start zomboid
