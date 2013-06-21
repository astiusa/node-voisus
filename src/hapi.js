var rest = require("restler");
var async = require('async');

var obj = function (host) {
  this.host = host;
  this.url = 'https://'+host+'/api/';
};

obj.prototype = {

  request: function(url, type, data, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = null;
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
    else if (type === 'post') {
      rest.post(url).on('complete', function(result) {
        if (result instanceof Error) {
          console.log('Error: '+ result.message);
          return cb(result);
        }
        cb(null, result);
      });
    }
    else if (type === 'put') {
      rest.put(url, data, {parser: rest.parsers.json}).on('complete', function(result) {
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
  getAboutMe: function(cb) {
    var url = this.url+'aboutme/';
    this.request(url, 'get', function(err, result) {
      cb(err, result);
    });
  },
  getPerfmon: function(cb) {
    var url = this.url+'perfmon/';
    this.request(url, 'get', function(err, result) {
      cb(err, result.stats);
    });
  },
  getRunlevel: function(cb) {
    var url = this.url+'syspower/';
    this.request(url, 'get', function(err, result) {
      if (result) {
        return cb(err, result.runlevel);
      }
      else {
        return cb(err);
      }
    });
  },
  reboot: function(cb) {
    var url = this.url+'syspower/reboot/';
    this.request(url, 'post', function(err, result) {
      cb(err, result);
    });
  },
  getNumClients: function(cb) {
    var url = this.url+'streams/clientmon/';
    var request = this.request;
    request(url, 'post', function(err, result) {
      if (err || !result || !result.state) {
        return cb(err);
      }
      cb(null, result.state.length);
    });
  },
  getNumRadios: function(cb) {
    var url = this.url+'radiomon/subscriptions/';
    var request = this.request;
    var sub;
    request(url, 'post', function(err, result) {
      if (err) {
        return cb(err);
      }
      sub = result.self;
      if (!sub) {
        return cb('no results1');
      }
      var req = {payload:{"__asti_message":"start-stats"}};
      request(sub, 'put', JSON.stringify(req), function(err, result) {
        if (err) {
          return cb(err);
        }
        if (!result) {
          return cb('RESULT NOT DEFINED!?!?!');
        }
        result = JSON.parse(result);
        console.log(result);
        if (result && result.payload) {
          if (result.payload.length === 0) {
            return cb(null, 0);
          }
          if (result.payload[0]) {
            result = JSON.parse(result.payload[0]);
            return cb(null, result.radios.length);
          }
        }
        else {
          cb('no results');
        }
      });
      //console.log(result.state);
      //console.log(result.state.length);
    });
  }
};

module.exports = obj;