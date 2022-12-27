#!/bin/bash

sudo systemctl start valheim

sudo systemctl start logger

echo "Valheim is currently" $(systemctl is-active valheim)
