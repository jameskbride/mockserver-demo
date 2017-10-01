const mockServer = require('mockserver-client');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

let mockServerClient = mockServer.mockServerClient;
const jsonFiles = glob.sync(path.resolve(__dirname, './src/expectations/') + '/*.json');

let loadExpectation = (rawExpectation) => {
    const jsonExpectation = JSON.parse(fs.readFileSync(rawExpectation));
    let processedExpectation = buildExpectation(jsonExpectation);
    mockServerClient("localhost", 9200).mockAnyResponse(processedExpectation);
};

let buildExpectation = (jsonExpectation) => {
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
                }
            ]
        },
        'times': {
            'unlimited': true
        }
    };

    if (jsonExpectation.queryStringParameters) {
        preProcessedExpectation.httpRequest.queryStringParameters =  jsonExpectation.queryStringParameters;
    }

    if (jsonExpectation.requestBody) {
        preProcessedExpectation.httpRequest.body = {
            type: "JSON_SCHEMA",
            jsonSchema: JSON.stringify(jsonExpectation.requestBody.value)
        }
    }

    return preProcessedExpectation;
};

jsonFiles.forEach(expectation => loadExpectation(expectation));
