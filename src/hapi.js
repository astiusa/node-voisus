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
      rest.post(url, data, {parser: rest.parsers.json}).on('complete', function(result) {
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
    else if (type === 'delete') {
      rest.del(url).on('complete', function(result) {
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
      if (err || !result || !result.stats) {
        return cb(err);
      }
      else {
        cb(err, result.stats);
      }
    });
  },
  getRunningSession: function(cb) {
    var url = this.url+'sessions/running/';
    this.request(url, 'get', function(err, result) {
      cb(err, result);
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
  },
  getDownloadURLs: function(cb) {
    var url = this.url+'downloads/';
    var request = this.request;
    request(url, 'get', function(err, result) {
      if (err || ! result.items) {
        return cb(err);
      }
      cb(null, result.items);
    });
  },
  getScenarioByName: function(scenarioName, cb) {
    var request = this.request;
    var url = this.url;
    async.waterfall([
      function(cb) {
        request(url, 'get', cb);
      },
      function(result, cb) {
        request(result.scenarios, 'get', cb);
      },
      function(result, cb) {
        var session;
        for(var i in result.items)
        {
          if(result.items[i].name === scenarioName)
          {
            session = result.items[i].self;
            break;
          }
        }
        cb(null, session);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  getScenarios: function(cb) {
    var request = this.request;
    var url = this.url;
    async.waterfall([
      function(cb) {
        request(url, 'get', cb);
      },
      function(result, cb) {
        request(result.scenarios, 'get', cb);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  createScenario: function(scenarioName, cb) {
    var request = this.request;
    var url =  this.url;
    var data = {data: {
      name: scenarioName
      }
    };
    async.waterfall([
      function(cb) {
        request(url, 'get', cb);
      },
      function(result, cb) {
        request(result.scenarios, 'post', data, cb);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  runScenario: function(scenarioName, cb) {
    var request = this.request;
    var url = this.url;
    var self = this;
    var sessionURL;
    var data = {};
    async.waterfall([
      function(cb) {
        request(url, 'get', cb);
      },
      function(result, cb) {
        sessionURL = result.sessions;
        request(result.scenarios, 'get', cb);
      },
      function(result, cb) {
        self.getScenarioByName(scenarioName, cb);
      },
      function(result, cb) {
        data = {data: {
          scenario: result
          }
        };
        request(sessionURL, 'post', data, cb);
      },
      function(result, cb) {
        cb();
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  deleteScenario: function(scenario, cb) {
    var request = this.request;
    async.waterfall([
      function(cb) {
        request(scenario, 'delete', cb);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  stopScenario: function(scenario, cb) {
    var request = this.request;
    async.waterfall([
      function(cb) {
        request(scenario, 'delete', cb);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  getSessions: function(cb) {
    var request = this.request;
    var url = this.url;
    async.waterfall([
      function(cb) {
        request(url, 'get', cb);
      },
      function(result, cb) {
        request(result.sessions, 'get', cb);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
  getRunningSession: function(cb) {
    var request = this.request;
    var url = this.url;
    async.waterfall([
      function(cb) {
        request(url, 'get', cb);
      },
      function(result, cb) {
        request(result.sessions, 'get', cb);
      },
      function(result, cb) {
        request(result.running, 'get', cb);
      }
    ], function(err, result) {
      if(err) {
        return cb(err);
      }
      cb(null, result);
    });
  },
};

module.exports = obj;
