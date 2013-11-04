var async = require('async');
var util = require('./util');

var api = {};
module.exports = api;

api.host = null;
api.url = null;

api.init = function(host) {
  api.host = host;
  api.url = 'https://'+api.host+'/api/';
  return api;
};

/* Basic API */

api.getApiVersion = function(cb) {
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
    },
    function(result, cb) {
      delete result.self;
      cb(null, result);
    },
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
    },
    function(result, cb) {
      delete result.self;
      cb(null, result);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getPerfMon = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.perfmon, 'get', cb);
    },
    function(result, cb) {
      delete result.stats.self;
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

api.getDownloads = function(cb) {
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

api.getFeatures = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.features, 'get', cb);
    },
    function(result, cb) {
      delete result.acenet.self;
      delete result.prc117f.self;
      delete result.debugwebsocket.self;
      delete result.networkcredits.self;
      delete result.crewintercom.self;
      delete result.urc200.self;
      delete result.sincgars.self;
      delete result.simscribeallpdus.self;
      delete result.multiserver.self;
      delete result.acexmpp.self;
      delete result.radiomonautotune.self;
      delete result.simscribevbs.self;
      delete result.disreplay.self;
      delete result.tocnetcau.self;
      delete result.acechat.self;
      delete result.prc119.self;
      delete result.webaudio.self;
      delete result.es3d.self;
      delete result.streamapi.self;
      delete result.dis.self;
      cb(null, result);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

/* Scenario API */

var _getScenarioById = function(scnId, cb) {
  var data = {};
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
        if(result.items[i].id === scnId)
        {
          data = {
            id: result.items[i].id,
            name: result.items[i].name,
            url: result.items[i].self,
            data_type: result.items[i].data_type
          };
          break;
        }
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

api.createScenario = function(scnName, cb) {
  var data = {name: scnName};
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
    var scn = require('./hapi.scenarios').init(api.host, result.id, result.self);
    cb(null, scn);
  });
};

api.createScenarioFromId = function(scnId, cb) {
  async.waterfall([
    function(cb) {
      _getScenarioById(scnId, cb);
    },
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    var scn = require('./hapi.scenarios').init(api.host, result.id, result.url);
    cb(null, scn);
  });
};

api.createScenarioFromTemplate = function(scnName, template, cb) {
  var tUrl;
  var data = {name: scnName};
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.templates) {
        if(result.templates[i].split('/')[6] === template) {
          tUrl = result.templates[i];
        }
      }
      util.request(tUrl, 'post', JSON.stringify(data), cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    var scn = require('./hapi.scenarios').init(api.host, result.id, result.self);
    cb(null, scn);
  });
};

api.getTemplates = function(cb) {
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.templates) {
        var temp = {
          name: result.templates[i].split('/')[6],
          data_type: 'template'
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

api.getScenarios = function(cb) {
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.scenarios, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
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

api.runScenario = function(scnId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      _getScenarioById(scnId, cb);
    },
    function(result, cb) {
      data = {scenario: result.url};
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      data = {
        id: result.scenario_id,
        name: result.scenario_name,
        session: result.session_id,
        host: result.scenario_host,
        state: result.install_state
      };
      cb(null, data);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.runAsyncScenario = function(scnId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      _getScenarioById(scnId, cb);
    },
    function(result, cb) {
      data = {
        async: true,
        scenario: result.url
      };
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      data = {
        id: result.scenario_id,
        name: result.scenario_name,
        session: result.session_id,
        host: result.scenario_host,
        state: result.install_state
      };
      cb(null, data);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.stopScenario = function(scnId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      _getSessionById(scnId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
    },
    function(result, cb) {
      data = {
        state: result.install_state
      };
      cb(null, data);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.deleteScenario = function(scnId, cb) {
  async.waterfall([
    function(cb) {
      _getScenarioById(scnId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

/* Session API */

var _getSessionById = function(scnId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items)
      {
        if(result.items[i].scenario_id === scnId)
        {
          data = {
            id: result.items[i].scenario_id,
            name: result.items[i].scenario_name,
            url: result.items[i].self,
            session: result.items[i].session_id,
            host: result.items[i].scenario_host,
            state: result.items[i].install_state,
            percent: result.items[i].install_status[0]
          };
          break;
        }
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

api.getRunningSession = function(cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.sessions, 'get', cb);
    },
    function(result, cb) {
      util.request(result.running, 'get', cb);
    },
    function(result, cb) {
      data = {
        id: result.scenario_id,
        name: result.scenario_name,
        session: result.session_id,
        host: result.scenario_host,
        state: result.install_state,
        percent: result.install_status[0]
      };
      cb(null, data);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

/* Cloud API */

api.getCloudId = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.cloud, 'get', cb);
    },
    function(result, cb) {
      var data = {
        id: result.self.cloud_id,
        data_type: 'cloud_id'
      };
      cb(null, data);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

/* Services API */

api.getServices = function(cb) {
  var scn = require('./hapi.services').init(api.host);
  cb(null, scn);
};

/* User API */

var _getUserById = function(userId, cb) {
  var data = {};
  var found = false;
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.users, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items)
      {

        if(result.items[i].id === userId)
        {
          data = {
            id: result.items[i].id,
            user: result.items[i].user,
            url: result.items[i].self,
            pass: result.items[i].pass
          };
          found = true;
          break;
        }
      }
      if (!found) {
        return cb(new Error('userName not found: '+userName));
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

var _getUserByName = function(userName, cb) {
  var data = {};
  var found = false;
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.users, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items)
      {
        if(result.items[i].user === userName)
        {
          data = {
            id: result.items[i].id,
            user: result.items[i].user,
            url: result.items[i].self,
            pass: result.items[i].pass
          };
          found = true;
          break;
        }
      }
      if (!found) {
        return cb(new Error('userName not found: '+userName));
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

api.getUsers = function(cb) {
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.users, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items)
      {
        var temp = {
          user: result.items[i].user,
          pass: result.items[i].pass,
          data_type: 'ams_user'
        };
        data.push(temp);
      }
      cb(null, data);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postUser = function(user, cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.users, 'post', user, cb);
    },
    function(result, cb) {
      var data = {};
      if(result === 'conflict') {
        return cb(new Error('[postUser] Error creating user '+user.user+'. User already exists.'));
      }
      else {
        data = {
          user: result.user,
          pass: result.pass,
          data_type: 'ams_user'
        };
      }
      cb(null, data);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.deleteUserById = function(userId, cb) {
  async.waterfall([
    function(cb) {
      _getUserById(userId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.deleteUserByName = function(userName, cb) {
  async.waterfall([
    function(cb) {
      _getUserByName(userName, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};
