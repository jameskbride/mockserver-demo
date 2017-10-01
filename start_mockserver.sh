#!/usr/bin/env bash

docker run -d -p 9200:9200 jamesdbloom/mockserver /opt/mockserver/run_mockserver.sh -logLevel INFO -serverPort 9200 -genericJVMOptions "-Dmockserver.enableCORSForAllResponses=false"