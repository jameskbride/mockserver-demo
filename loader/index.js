const mockServer = require('mockserver-client');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

let mockServerClient = mockServer.mockServerClient;
const jsonFiles = glob.sync(path.resolve(__dirname, './src/expectations/') + '/*.json');

jsonFiles.forEach(expectation => {
        const jsonExpectation = JSON.parse(fs.readFileSync(expectation));
        mockServerClient("localhost", 9200).mockAnyResponse(
            {
                'httpRequest': {
                    'method': jsonExpectation.method,
                    'path': jsonExpectation.path,
                    'queryStringParameters': jsonExpectation.queryStringParameters
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
            }
        )
    }
);
