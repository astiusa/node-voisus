var async = require('async');
var util = require('./util');

var api = {};
module.exports = api;

api.host = null;
api.url = null;

api.createHapi = function(host) {
  api.host = host;
  api.url = 'https://'+api.host+'/api/';
  return api;
};

api.getAPIVersion = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      cb(null, result.apiversion);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getVersion = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.version, 'get', cb);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAboutMe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.aboutme, 'get', cb);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getPerfmon = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.perfmon, 'get', cb);
    },
    function(result, cb) {
      cb(null, result.stats);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getRunlevel = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.syspower, 'get', cb);
    },
    function(result, cb) {
      cb(null, result.runlevel);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getDownloadURLs = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.downloads, 'get', cb);
    },
    function(result, cb) {
      cb(null, result.items);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getServers = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.servers, 'get', cb);
    },
    function(result, cb) {
      cb(null, result.items);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};
