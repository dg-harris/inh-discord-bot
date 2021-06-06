#!/bin/bash

sudo systemctl start valheim

echo "Valheim is currently" $(systemctl is-active valheim)
