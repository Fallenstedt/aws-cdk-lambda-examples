#!/bin/bash

current_dir=$PWD;

cd function && make build
cd $current_dir;

cd just-lambda && npm run cdk deploy -- --outputs-file outputs.json
