const mockServer = require('mockserver-client');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

let mockServerClient = mockServer.mockServerClient("localhost", 9200);
const jsonFiles = glob.sync(path.resolve(__dirname, './src/expectations/') + '/*.json');

let loadExpectation = (rawExpectation) => {
    const jsonExpectation = JSON.parse(fs.readFileSync(rawExpectation));
    let processedExpectation = buildExpectation(jsonExpectation);
    mockServerClient.mockAnyResponse(processedExpectation);
};

let buildExpectation = (jsonExpectation) => {
    let preProcessedExpectation = buildPreprocessedExpectation(jsonExpectation);
    addQueryParameters(jsonExpectation, preProcessedExpectation);
    addBody(jsonExpectation, preProcessedExpectation);

    return preProcessedExpectation;
};

let buildPreprocessedExpectation = function (jsonExpectation) {
    let preProcessedExpectation = {
        'httpRequest': {
            'method': jsonExpectation.method,
            'path': jsonExpectation.path
        },
        'httpResponse': {
            'statusCode': jsonExpectation.statusCode,
            'body': JSON.stringify(jsonExpectation.body),
            'headers': [
                {
                    "name": "Content-Type",
                    "values": ["application/json; charset=utf-8"]
                },
                {
                    "name": "Access-Control-Allow-Origin",
                    "values": ["*"]
                }
            ]
        },
        'times': {
            'unlimited': true
        }
    };
    return preProcessedExpectation;
};


let addQueryParameters = function (jsonExpectation, preProcessedExpectation) {
    if (jsonExpectation.queryStringParameters) {
        preProcessedExpectation.httpRequest.queryStringParameters = jsonExpectation.queryStringParameters;
    }
};

let addBody = function (jsonExpectation, preProcessedExpectation) {
    if (jsonExpectation.requestBody) {
        if (jsonExpectation.requestBody.type === 'JSON_SCHEMA') {
            preProcessedExpectation.httpRequest.body = {
                type: 'JSON_SCHEMA',
                jsonSchema: JSON.stringify(jsonExpectation.requestBody.value)
            }
        }

        if (jsonExpectation.requestBody.type === 'JSON') {
            preProcessedExpectation.httpRequest.body = {
                type: 'JSON',
                matchType: jsonExpectation.requestBody.matchType,
                json: JSON.stringify(jsonExpectation.requestBody.json)
            }
        }
    }
};

mockServerClient.reset();
jsonFiles.forEach(expectation => loadExpectation(expectation));
