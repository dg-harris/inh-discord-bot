#! /bin/bash

curl -X POST 127.0.0.1:8080/valheimM -d '{"content": "Valheim is currently '"$(systemctl is-active valheim)"'."}'
