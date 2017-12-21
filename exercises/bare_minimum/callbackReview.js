/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath) {
  var callback = arguments[arguments.length - 1];
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      var firstLine = data.toString().split('\n')[0];
      callback(err, firstLine);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url) {
  var callback = arguments[arguments.length - 1];
  request(url, function(error, response, body) {
    if (error) {
      callback(error);
    } else {
      callback(error, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
