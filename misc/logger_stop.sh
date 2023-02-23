#! /bin/bash

curl -X PUT 127.0.0.1:8080/pinned/valheim -d '{"content": "Valheim is currently '"$(systemctl is-active valheim)"'."}'
