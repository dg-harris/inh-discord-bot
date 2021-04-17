#!/bin/bash

sudo systemctl stop factorio

echo "Factorio is currently" $(systemctl is-active factorio)
