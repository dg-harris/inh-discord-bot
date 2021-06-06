#!/bin/bash

myip="$(wget -qO- http://ipecho.net/plain | xargs echo)"
echo "${myip}"
