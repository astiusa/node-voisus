var async = require('async');
var util = require('./util');

var api = {};
module.exports = api;

api.host = null;
api.url = null;

api.createSessions = function(host) {
  api.host = host;
  api.url = 'https://'+api.host+'/api/';
  return api;
};

api.getSessions = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'get', cb);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getRunningSession = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'get', cb);
    },
    function(result, cb) {
      util.request(result.running, 'get', cb);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};
