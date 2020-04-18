#!/bin/bash

# Run this on the server

cd /var/www/html/Music-Store
git fetch
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
	echo "Up-to-date"
elif [ $LOCAL = $BASE ]; then
	echo "Need to pull"
	git pull
	rm -f /var/www/html/*
	sudo cp /var/www/html/Music-Store/Frontend/* /var/www/html/
	sudo cp /var/www/html/Music-Store/API/* /var/www/html/
elif [ $REMOTE = $BASE ]; then
	echo "Need to push"
else
	echo "Diverged"
	git pull # Handle divergence ?
fi
