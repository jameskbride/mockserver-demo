#!/usr/bin/env bash

printf "\n\nAggregations...\n\n"

curl -X POST \
  http://localhost:9200/encounters/_search \
  -H 'content-type: application/json' \
  -d '{
    "query": {
    	"match": {
    		"description": "green"
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

printf "\n\nSearching for orbs\n\n"

curl -X GET \
  'http://localhost:9200/encounters/_search?q=orbs' \
  -H 'content-type: application/json'

printf "\n\nSearching for formations\n\n"

curl -X GET \
'http://localhost:9200/encounters/_search?q=formation' \
-H 'content-type: application/json'

printf "\n\nSearching for triangles\n\n"

curl -X GET \
'http://localhost:9200/encounters/_search?q=triangle' \
-H 'content-type: application/json'

printf "\n\nSearching for single record\n\n"

curl -X GET \
  http://localhost:9200/encounters/encounter/AV1stsDO5J77fbpnTxoE \
  -H 'content-type: application/json'