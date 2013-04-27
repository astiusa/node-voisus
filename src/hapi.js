var rest = require("restler");

var obj = function (host) {
  this.host = host;
  this.url = 'https://'+host+'/api/';
};

obj.prototype = {

  request: function(url, type, data, cb) {
    if (typeof data === 'function') {
      cb = data;
    }
    if (type === 'get') {
      rest.get(url).on('complete', function(result) {
        if (result instanceof Error) {
          console.log('Error: '+ result.message);
          return cb(result);
        }
        cb(null, result);
      });
    }
  },
  getAPIVersion: function(cb) {
    var url = this.url;
    this.request(url, 'get', function(err, result) {
      cb(err, result.apiversion);
    });
  },
  getVersion: function(cb) {
    var url = this.url+'version/';
    this.request(url, 'get', function(err, result) {
      cb(err, result);
    });
  },
  getPerfmon: function(cb) {
    var url = this.url+'perfmon/';
    this.request(url, 'get', function(err, result) {
      cb(err, result);
    });
  }

};

module.exports = obj;