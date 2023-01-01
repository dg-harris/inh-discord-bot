#!/bin/bash

if systemctl is-active --quiet valheim  > /dev/null 2>&1; then
	echo "Valheim is already running."
else
	sudo systemctl start valheim
	sudo systemctl start logger
	echo "Valheim is currently" $(systemctl is-active valheim)
fi