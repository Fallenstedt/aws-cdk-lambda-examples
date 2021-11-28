#!/bin/bash

current_dir=$PWD;

cd function && make build
cd $current_dir;

cd lambda-with-alias && npm run cdk deploy -- --outputs-file outputs.json --parameters snsEmail=YOUR_EMAIL_HERE
