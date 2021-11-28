#!/bin/bash
for i in {1..500}
do
  # sleep 500ms
  sleep 0.5 
  curl 'https://your-lambda-fn-domain.com?name=Alex'
  echo -e '\n'
done
