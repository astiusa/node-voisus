var async = require('async');
var util = require('./util');

var api = {};
module.exports = api;

api.host = null;
api.url = null;

api.createScenarios = function(host) {
  api.host = host;
  api.url = 'https://'+api.host+'/api/';
  return api;
};

api.getScenarios = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getScenariosId = function(cb) {
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items)
      {
        var temp = {
          id: result.items[i].id,
          name: result.items[i].name,
          data_type: result.items[i].data_type
        };
        data.push(temp);
      }
      cb(null, data);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getScenarioByName = function(scenarioName, cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'get', cb);
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
};

api.createScenario = function(scenarioName, cb) {
  var data = {name: scenarioName};
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.runScenario = function(scenario, cb) {
  var data = {scenario: scenario};
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.runScenarioByName = function(scenarioName, cb) {
  var sessionURL;
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      sessionURL = result.sessions;
      util.request(result.scenarios, 'get', cb);
    },
    function(result, cb) {
      api.getScenarioByName(scenarioName, cb);
    },
    function(result, cb) {
      data = {scenario: result};
      util.request(sessionURL, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.runAsyncScenario = function(scenario, cb) {
  var data = {
    async: true,
    scenario: scenario
  };
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.stopScenario = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.deleteScenario = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getDisDomains = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis_domains, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putDisDomains = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'put', data, cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postDisDomains = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'post', data, cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delDisDomains = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getDis = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putDis = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'put', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postDis = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delDis = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getNets = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'get', cb);
    },
    function(result, cb) {
      util.request(result.nets, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putNets = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'put', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postNets = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delNets = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getRoles = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'get', cb);
    },
    function(result, cb) {
      util.request(result.roles, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putRoles = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'put', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postRoles = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delRoles = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getRolesGenericRadio = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'get', cb);
    },
    function(result, cb) {
      util.request(result.generic_radio, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getFills = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'get', cb);
    },
    function(result, cb) {
      util.request(result.fills, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putFills = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'put', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postFills = function(scenario, data, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delFills = function(scenario, cb) {
  async.waterfall([
    function(cb) {
      util.request(scenario, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};


