const mockServer = require('mockserver-client');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const BASE_URL = '/static';

let mockServerClient = mockServer.mockServerClient("localhost", 9200);
const jsonFiles = glob.sync(path.resolve(__dirname, './dist/') + "/**/!(*.map)");

let getFileExtension = function (file) {
  let splitFileName = file.split('.');
  let count = splitFileName.length;
  let fileExtension = splitFileName[count - 1];
  return fileExtension;
};

let getFileName = function (file) {
  let splitFileName = file.split('dist/');
  let count = splitFileName.length;
  let fileName = splitFileName[count - 1];
  return fileName;
};

let buildPreprocessedExpectation = function (contentType, filePath, content) {
  let preProcessedExpectation = {
    'httpRequest': {
      'method': 'GET',
      'path': filePath
    },
    'httpResponse': {
      'statusCode': 200,
      'body': content,
      'headers': [
        {
          "name": "Content-Type",
          "values": [contentType]
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

let getContentType = function (fileExtension) {
  let contentType = '';
  if (fileExtension === 'html') {
    contentType = 'text/html'
  } else if (fileExtension === 'js') {
    contentType = 'text/javascript; charset=utf-8'
  }
  return contentType;
};

let getExpectationFileName = function (fileName) {
  let expectationFileName = '';
  if (fileName === 'index.html') {
    expectationFileName = BASE_URL + '/' + fileName;
  } else {
    expectationFileName = '/' + fileName;
  }
  return expectationFileName;
};

jsonFiles.forEach((file) => {
  let fileName = getFileName(file);
  let fileExtension = getFileExtension(fileName);
  let contentType = getContentType(fileExtension);
  let expectationFileName = getExpectationFileName(fileName);
  const content = String(fs.readFileSync(file));
  let preProcessedExpectation = buildPreprocessedExpectation(contentType, expectationFileName, content);
  mockServerClient.clear(preProcessedExpectation.httpRequest);
  mockServerClient.mockAnyResponse(preProcessedExpectation);
});


