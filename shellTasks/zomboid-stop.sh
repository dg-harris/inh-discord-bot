#!/bin/bash

sudo systemctl stop zomboid

echo "Project Zomboid is currently" $(systemctl is-active zomboid)
