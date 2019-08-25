#!/bin/bash

while true
do
  echo -n .
  [ -f /usr/src/keyman/wallets/Gustavo ] && break
  sleep 2
done
cat $(echo $(ls -1 /usr/src/keyman/wallets/* | grep -v "_" ))

