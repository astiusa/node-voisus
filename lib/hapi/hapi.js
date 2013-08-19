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
  
api.reboot = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.syspower, 'get', cb);
    },
    function(result, cb) {
      util.request(result.reboot, 'post', cb);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getNumClients = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.streams, 'get', cb);
    },
    function(result, cb) {
      var numClient;
      for(var i in result.items)
      {
        if (result.items[i].name === 'Client_Monitor')
        {
          numClient = result.items[i].href;
          break;
        }
      }
      cb(null, numClient);
    },
    function(result, cb) {
      util.request(result, 'post', cb);
    }
  ], function(err, result) {
    if (err || !result || !result.state) {
      return cb(err);
    }
    cb(null, result.state.length);
  });
};

api.getNumRadios = function(cb) {
  var url = this.url+'radiomon/subscriptions/';
  var request = this.request;
  var sub;
  util.request(url, 'post', function(err, result) {
    if (err) {
      return cb(err);
    }
    sub = result.self;
    if (!sub) {
      return cb('no results1');
    }
    var req = {payload:{"__asti_message":"start-stats"}};
    util.request(sub, 'put', JSON.stringify(req), function(err, result) {
      if (err) {
        return cb(err);
      }
      if (!result) {
        return cb('RESULT NOT DEFINED!?!?!');
      }
      result = JSON.parse(result);
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

//Not working
api.generateSOS = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      //util.request(result.sos, 'post', JSON.stringify({}), cb);
      cb(null);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};
