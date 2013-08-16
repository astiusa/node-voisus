var async = require('async');
var util = require('./util');

var api = {};
module.exports = api;

api.host = null;
api.url = null;

api.createCloud = function(host) {
  api.host = host;
  api.url = 'https://'+api.host+'/api/';
  return api;
};

api.getCurrentCloud = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.cloud, 'get', cb);
    },
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getCurrentCloudId = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.cloud, 'get', cb);
    },
    function(result, cb) {
      cb(null, result.self.cloud_id);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getCloudId = function(cloudId, cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.cloud+cloudId, 'get', cb);
    },
    function(result, cb) {
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.setCloudId = function(cloudId, cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.cloud+cloudId, 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};
