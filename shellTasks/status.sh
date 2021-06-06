#!/bin/bash

echo "Valheim is currently" $(systemctl is-active valheim)
echo "Factorio is currently" $(systemctl is-active factorio)
