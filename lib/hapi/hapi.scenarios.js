var async = require('async');
var util = require('./util');
var _ = require('underscore');

var api = {};
module.exports = api;

api.init = function(host, scnId, scnUrl) {
  var obj = _.clone(api);
  obj._host = host;
  obj._url = 'https://'+host+'/api/';
  obj._scnId = scnId;
  obj._scnUrl = scnUrl;
  return obj;
};

api.toJSON = function(){
  return {
      id: this._scnId
  };
};

var _getDisDomainsById = function(scn, dDomId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
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

api.getDisDomains = function(cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis_domains, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        var temp = {
          id: result.items[i].id,
          name: result.items[i].name,
          data_type: result.items[i].data_type,
          version: result.items[i].version,
          exercise: result.items[i].exercise
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

api.putDisDomains = function(dDomId, data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      _getDisDomainsById(scn, dDomId, cb);
    },
    function(result, cb) {
      util.request(result.url, 'put', data, cb);
    },
    function(result, cb) {
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        version: result.version,
        exercise: result.exercise,
        editable: result.editable
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

api.postDisDomains = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis_domains, 'post', data, cb);
    },
    function(result, cb) {
      var data = {
          id: result.id,
          name: result.name,
          data_type: result.data_type,
          version: result.version,
          exercise: result.exercise,
          editable: result.editable
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
      var data = {
        id: result
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


