#!/bin/bash
for i in {1..500}
do
  # sleep 500ms
  sleep 0.5 
  curl 'https://go6tdk6f2e.execute-api.us-west-2.amazonaws.com/prod?name=Alex'
  echo -e '\n'
done
