#!/bin/bash

# Run this on the server; checks for updates every ~10 seconds

cd ./Music-Store/

while true; do
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
		rm -rf /var/www/html/*
		sudo cp /var/www/html/Music-Store/Frontend/* /var/www/html/
		sudo cp /var/www/html/Music-Store/API/* /var/www/html/
	elif [ $REMOTE = $BASE ]; then
		echo "Need to push"
	else
		echo "Diverged"
		git pull # Handle divergence ?
	fi
	sleep 120 # Re-check in 10 seconds
done
