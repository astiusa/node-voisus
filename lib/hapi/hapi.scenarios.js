var async = require('async');
var util = require('./util');
var _ = require('underscore');

var api = {};
module.exports = api;

api.init = function(host, scnId, scnUrl) {
  var obj = _.clone(api);
  obj.host = host;
  obj.url = 'https://'+host+'/api/';
  obj.scnId = scnId;
  obj.scnUrl = scnUrl;
  return obj;
};

var _getDisDomainsById = function(scn, dDomId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis_domains, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        if(result.items[i].id === dDomId)
        {
          data = {
            id: result.items[i].id,
            name: result.items[i].name,
            url: result.items[i].self,
            data_type: result.items[i].data_type,
            version: result.items[i].version,
            exercise: result.items[i].exercise
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

var _getNetsById = function(scn, netId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.nets, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        if(result.items[i].id === netId)
        {
          data = {
            id: result.items[i].id,
            name: result.items[i].name,
            url: result.items[i].self,
            data_type: result.items[i].data_type,
            version: result.items[i].version,
            txfrequency: result.items[i].txfrequency,
            rev: result.items[i].rev,
            crypto: result.items[i].crypto,
            frequency: result.items[i].frequency,
            satcom: result.items[i].satcom,
            freqhop: result.items[i].freqhop
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

var _getRolesById = function(scn, roleId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.roles, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        if(result.items[i].id === roleId)
        {
          data = {
            id: result.items[i].id,
            name: result.items[i].name,
            url: result.items[i].self,
            data_type: result.items[i].data_type,
            description: result.items[i].description,
            rev: result.items[i].rev,
            version: result.items[i].version,
            shared: result.items[i].shared,
            autotune_enabled: result.items[i].autotune_enabled,
            radiohw: result.items[i].radiohw,
            calling_enabled: result.items[i].calling_enabled,
            chat_enabled: result.items[i].chat_enabled
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

var _getFillsById = function(scn, fillId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.fills, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        if(result.items[i].id === fillId)
        {
          data = {
            id: result.items[i].id,
            name: result.items[i].name,
            url: result.items[i].self,
            data_type: result.items[i].data_type,
            description: result.items[i].description,
            rev: result.items[i].rev,
            version: result.items[i].version,
            single_net_container: result.items[i].single_net_container,
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

api.getDisDomains = function(cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis_domains, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        delete result.items[i].parent;
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

api.putDisDomains = function(dDomId, data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getDisDomainsById(scn, dDomId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'put', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postDisDomains = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis_domains, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delDisDomains = function(dDomId, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getDisDomainsById(scn, dDomId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
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

api.getDis = function(cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'get', cb);
    },
    function(result, cb) {
      delete result.self;
      delete result.parent;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putDis = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'put', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.self;
      delete result.parent;
      cb(null, data);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postDis = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'post', JSON.stringify(data), cb);
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

api.delDis = function(cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'delete', cb);
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

api.getNets = function(cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.nets, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        delete result.items[i].parent;
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

api.putNets = function(netId, data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getNetsById(scn, netId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'put', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postNets = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.nets, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delNets = function(netId, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getNetsById(scn, netId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
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

api.getRoles = function(cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.roles, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        delete result.parent;
        delete result.children;
        delete result.self;
        delete result.role_radio_map;
        delete result['PRC-148'];
        delete result.generic_radio;
        delete result.commpanel_tmpl;
        delete result['PRC-119'];
        delete result['PRC-152'];
        delete result.live_radio;
        delete result.SINCGARS;
        delete result['PRC-117G'];
        delete result['PRC-117F'];
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

api.putRoles = function(roleId, data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getRolesById(scn, roleId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'put', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.children;
      delete result.self;
      delete result.role_radio_map;
      delete result['PRC-148'];
      delete result.generic_radio;
      delete result.commpanel_tmpl;
      delete result['PRC-119'];
      delete result['PRC-152'];
      delete result.live_radio;
      delete result.SINCGARS;
      delete result['PRC-117G'];
      delete result['PRC-117F'];
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postRoles = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.roles, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.children;
      delete result.self;
      delete result.role_radio_map;
      delete result['PRC-148'];
      delete result.generic_radio;
      delete result.commpanel_tmpl;
      delete result['PRC-119'];
      delete result['PRC-152'];
      delete result.live_radio;
      delete result.SINCGARS;
      delete result['PRC-117G'];
      delete result['PRC-117F'];
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delRoles = function(roleId, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getRolesById(scn, roleId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
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

api.getRolesGenericRadio = function(roleId, cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      _getRolesById(scn, roleId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.generic_radio, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        delete result.items[i].parent;
        delete result.items[i].self;
        delete result.items[i].entries;
        delete result.items[i].default_net;
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

api.postRolesGenericRadio = function(roleId, data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getRolesById(scn, roleId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.generic_radio, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      delete result.entries;
      delete result.default_net;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });

};

api.getFills = function(cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.fills, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        delete result.items[i].parent;
        delete result.items[i].self;
        delete result.items[i].nets;
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

api.putFills = function(fillId, data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getFillsById(scn, fillId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'put', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      delete result.nets;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.postFills = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.fills, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      delete result.parent;
      delete result.self;
      delete result.nets;
      cb(null, result);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delFills = function(fillId, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getFillsById(scn, fillId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'delete', cb);
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

api.getPerformanceTest = function(cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.performance_test, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getPerformanceTestReports = function(cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn.scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.performance_test_reports, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};
