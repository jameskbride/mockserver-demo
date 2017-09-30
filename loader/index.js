const mockServer = require('mockserver-client');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

let mockServerClient = mockServer.mockServerClient;
const jsonFiles = glob.sync(path.resolve(__dirname, './src/expectations/') + '/*.json');

let loadExpectation = (expectation) => {
    const jsonExpectation = JSON.parse(fs.readFileSync(expectation));
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

    mockServerClient("localhost", 9200).mockAnyResponse(preProcessedExpectation);
};

jsonFiles.forEach(expectation => loadExpectation(expectation));
