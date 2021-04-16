#!/bin/bash

echo "Updating Factorio"
sudo systemctl stop factorio
python3 /home/kvamme/Factorio/update_factorio.py -Da /opt/factorio/bin/x64/factorio
sudo systemctl start factorio
