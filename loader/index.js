let mockServer = require('mockserver-client');
let glob = require('glob');
let fs = require('fs');
let path = require('path');

let mockServerClient = mockServer.mockServerClient;
const jsonFiles = glob.sync(path.resolve(__dirname, './src/expectations/') + '/*.json');

jsonFiles.forEach(expectation => {
  let jsonExpectation = JSON.parse(fs.readFileSync(expectation));
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
  );
});
