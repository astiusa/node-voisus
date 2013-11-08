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
  var found = false;
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
          delete result.items[i].behaviors;
          delete result.items[i].entity_filters;
          delete result.items[i].radio_bridge_presets;
          delete result.items[i].scenario_lockdown;
          delete result.items[i].waveforms;
          delete result.items[i].grammars;
          delete result.items[i].sounds;
          delete result.items[i].nets;
          delete result.items[i].dis_domains;
          delete result.items[i].remote_controls;
          delete result.items[i].radio_effects;
          delete result.items[i].commplan_import;
          delete result.items[i].subscriptions;
          delete result.items[i].construct;
          delete result.items[i].entities;
          delete result.items[i].performance_test;
          delete result.items[i].parent;
          delete result.items[i].interactions;
          delete result.items[i].vsclients;
          delete result.items[i].scenario_export;
          delete result.items[i].performance_test_reports;
          delete result.items[i].response_rules;
          delete result.items[i].model_templates;
          delete result.items[i].client_audio_monitors;
          delete result.items[i].dis_wfmaps;
          delete result.items[i].radio_bridges;
          delete result.items[i].asr_configs;
          delete result.items[i].es3d_observers;
          delete result.items[i].roles;
          delete result.items[i].fills;
          delete result.items[i].commplan_export;
          delete result.items[i].freqhops;
          delete result.items[i].vehicles;
          delete result.items[i].ecue_sound_overrides;
          delete result.items[i].satcoms;
          delete result.items[i].dred_test;
          delete result.items[i].cryptos;
          delete result.items[i].entity_types;
          delete result.items[i].call_groups;
          delete result.items[i].dis_hla_rpr;
          delete result.items[i].dis;
          result.items[i].url = result.items[i].self;
          delete result.items[i].self;
          data = result.items[i];
          found = true;
          break;
        }
      }
      if(!found) {
        return cb(new Error('scenario not found: '+scnId));
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
        result.templates[i] = result.templates[i].split('/')[6];
        data.push(result.templates[i]);
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
        delete result.items[i].behaviors;
        delete result.items[i].entity_filters;
        delete result.items[i].radio_bridge_presets;
        delete result.items[i].scenario_lockdown;
        delete result.items[i].waveforms;
        delete result.items[i].grammars;
        delete result.items[i].sounds;
        delete result.items[i].nets;
        delete result.items[i].dis_domains;
        delete result.items[i].remote_controls;
        delete result.items[i].radio_effects;
        delete result.items[i].commplan_import;
        delete result.items[i].subscriptions;
        delete result.items[i].construct;
        delete result.items[i].entities;
        delete result.items[i].performance_test;
        delete result.items[i].parent;
        delete result.items[i].interactions;
        delete result.items[i].vsclients;
        delete result.items[i].scenario_export;
        delete result.items[i].performance_test_reports;
        delete result.items[i].response_rules;
        delete result.items[i].model_templates;
        delete result.items[i].client_audio_monitors;
        delete result.items[i].dis_wfmaps;
        delete result.items[i].radio_bridges;
        delete result.items[i].asr_configs;
        delete result.items[i].es3d_observers;
        delete result.items[i].roles;
        delete result.items[i].fills;
        delete result.items[i].commplan_export;
        delete result.items[i].freqhops;
        delete result.items[i].vehicles;
        delete result.items[i].ecue_sound_overrides;
        delete result.items[i].satcoms;
        delete result.items[i].dred_test;
        delete result.items[i].cryptos;
        delete result.items[i].entity_types;
        delete result.items[i].call_groups;
        delete result.items[i].dis_hla_rpr;
        delete result.items[i].dis;
        result.items[i].url = result.items[i].self;
        delete result.items[i].self;
        data.push(result.items[i]);
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
      delete result.subscriptions;
      delete result.self;
      delete result.scenario_href;
      cb(null, result);
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
      delete result.subscriptions;
      delete result.self;
      delete result.scenario_href;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.stopScenario = function(scnId, cb) {
  async.waterfall([
    function(cb) {
      _getSessionById(scnId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
    },
    function(result, cb) {
      delete result.subscriptions;
      delete result.self;
      delete result.scenario_href;
      cb(null, result);
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

/* Services API */

api.createServices = function(cb) {
  var scn = require('./hapi.services').init(api.host);
  cb(null, scn);
};

/* Session API */

var _getSessionById = function(scnId, cb) {
  var data = {};
  var found = false;
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
          delete result.items[i].subscriptions;
          delete result.items[i].scenario_href;
          result.items[i].url = result.items[i].self;
          delete result.items[i].self;
          data = result.items[i];
          found = true;
          break;
        }
      }
      delete result.running;
      delete result.self;

      if(!found) {
        return cb(new Error('session not found: '+scnId));
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
      result.url = result.self;
      delete result.self;
      delete result.subscriptions;
      delete result.scenario_href;
      cb(null, result);
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
      delete result.self.href;
      delete result.clients;
      cb(null, result);
    }
  ], function(err, result) {
    if (err) {
      return cb(err);
    }
    cb(null, result);
  });
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
          result.items[i].url = result.items[i].self;
          delete result.items[i].self;
          data = result.items[i];
          found = true;
          break;
        }
      }
      if (!found) {
        return cb(new Error('userId not found: '+userId));
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
          result.items[i].url = result.items[i].self;
          delete result.items[i].self;
          data = result.items[i];
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
        delete result.items[i].self;
        data.push(result.items[i]);
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
      if(result === 'conflict') {
        return cb(new Error('[postUser] Error creating user '+user.user+'. User already exists.'));
      }
      else {
        delete result._rev;
        delete result._id;
        cb(null, result);
      }
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
