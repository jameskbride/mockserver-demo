#!/usr/bin/env bash

printf "\n\nSearching for by query parameters\n\n"

curl -X GET \
  'http://localhost:9200/encounters/_search?q=orbs' \
  -H 'content-type: application/json'

printf "\n\nSearching for by json schema match\n\n"

curl -X POST \
  http://localhost:9200/encounters/_search \
  -H 'content-type: application/json' \
  -d '{
    "query": {
    	"match": {
    		"description": "Mount Callahan"
    	}
    },
    "aggs" : {
        "shapes" : {
            "terms" : {
              "field" : "shape"
            }
        }
    }
}'

printf "\n\nSearching for by json match\n\n"

curl -X POST \
  http://localhost:9200/encounters/_search \
  -H 'content-type: application/json' \
  -d '{
    "query": {
    	"match": {
    		"description": "Fireball"
    	}
    },
    "aggs" : {
        "shapes" : {
            "terms" : {
              "field" : "shape"
            }
        }
    }
}'

printf "\n\nSearching for url path match\n\n"

curl -X GET \
  http://localhost:9200/encounters/encounter/AV1stsDO5J77fbpnTxoE \
  -H 'content-type: application/json'