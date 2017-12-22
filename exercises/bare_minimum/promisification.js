/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};


var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);

// Our version
// var getGitHubProfileAsync = function(user) {
//   var options = {
//     url: 'https://api.github.com/users/' + user,
//     headers: { 'User-Agent': 'request' },
//     json: true  // will JSON.parse(body) for us
//   };

//   var promise = new Promise((resolve, reject) => {
//     request.get(options, (err, res, body) => {
//       if (err) {
//         reject(err);
//       } else if (body.message) {
//         reject(new Error('Failed to get GitHub profile: ' + body.message), null);
//       } else {
//         resolve(body);
//       }
//     });  
//   });
//   return promise;
// };

// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken);

// Our version
// var generateRandomTokenAsync = () => {
//   var promise = new Promise((resolve, reject) => {
//     crypto.randomBytes(20, (err, buffer) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(buffer.toString('hex'));
//       }
//     });
//   });
//   return promise;
// };


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }
   
    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

// var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny); - // Doesn't work probably because of map().

// Our version
var readFileAndMakeItFunnyAsync = (filePath) => {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) {
        reject(err);
      } else {
        var funnyFile = file.split('\n')
          .map((line) => {
            return line + ' lol';
          })
        .join('\n');
        resolve(funnyFile);
      }           
    });
  });
  return promise;
}; 

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
