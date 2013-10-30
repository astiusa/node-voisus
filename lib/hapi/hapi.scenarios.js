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

var _getNetsById = function(scn, netId, cb) {
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
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
      util.request(scn._scnUrl, 'get', cb);
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
      util.request(scn._scnUrl, 'get', cb);
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
      util.request(result.url, 'put', JSON.stringify(data), cb);
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
      util.request(result.dis_domains, 'post', JSON.stringify(data), cb);
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

api.getDis = function(cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'get', cb);
    },
    function(result, cb) {
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        version: result.version,
        dis_moving_threshold: result.dis_moving_threshold,
        rev: result.rev,
        pdu_signal: result.pdu_signal,
        dis_timeout_moving: result.dis_timeout_moving,
        mcast_addr: result.mcast_addr,
        description: result.description,
        pdu_rx: result.pdu_rx,
        pdu_entity_mcast_addr: result.pdu_entity_mcast_addr,
        ip_mode: result.ip_mode,
        pdu_tx_mcast_addr: result.pdu_tx_mcast_addr,
        dis_app_id: result.dis_app_id,
        ucast_addr: result.ucast_addr,
        pdu_tx: result.pdu_tx,
        pdu_signal_mcast_addr: result.pdu_signal_mcast_addr,
        dis_site_id: result.dis_site_id,
        mcast_addr_start: result.mcast_addr_start,
        network_modulations: result.network_modulations,
        setup_type: result.setup_type,
        udp_port: result.udp_port,
        dis_timeout_normal: result.dis_timeout_normal,
        pdu_entity: result.pdu_entity,
        domain_exid_map: result.domain_exid_map,
        dis_id_mode: result.dis_id_mode,
        pdu_rx_mcast_addr: result.pdu_rx_mcast_addr,
        dis_version: result.dis_version,
        radio_tx_period: result.radio_tx_period,
        radio_holdoff: result.radio_holdoff,
        eth: result.eth
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

api.putDis = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'put', JSON.stringify(data), cb);
    },
    function(result, cb) {
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        version: result.version,
        dis_moving_threshold: result.dis_moving_threshold,
        rev: result.rev,
        pdu_signal: result.pdu_signal,
        dis_timeout_moving: result.dis_timeout_moving,
        mcast_addr: result.mcast_addr,
        description: result.description,
        pdu_rx: result.pdu_rx,
        pdu_entity_mcast_addr: result.pdu_entity_mcast_addr,
        ip_mode: result.ip_mode,
        pdu_tx_mcast_addr: result.pdu_tx_mcast_addr,
        dis_app_id: result.dis_app_id,
        ucast_addr: result.ucast_addr,
        pdu_tx: result.pdu_tx,
        pdu_signal_mcast_addr: result.pdu_signal_mcast_addr,
        dis_site_id: result.dis_site_id,
        mcast_addr_start: result.mcast_addr_start,
        network_modulations: result.network_modulations,
        setup_type: result.setup_type,
        udp_port: result.udp_port,
        dis_timeout_normal: result.dis_timeout_normal,
        pdu_entity: result.pdu_entity,
        domain_exid_map: result.domain_exid_map,
        dis_id_mode: result.dis_id_mode,
        pdu_rx_mcast_addr: result.pdu_rx_mcast_addr,
        dis_version: result.dis_version,
        radio_tx_period: result.radio_tx_period,
        radio_holdoff: result.radio_holdoff,
        eth: result.eth
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

api.postDis = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      var data = {state: 'deleted'};
      cb(null, data);
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
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.dis, 'delete', cb);
    },
    function(result, cb) {
      var data = {name: 'delete'};
      cb(null, data);
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
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.nets, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        var temp = {
          id: result.items[i].id,
          name: result.items[i].name,
          data_type: result.items[i].data_type,
          version: result.items[i].version,
          description: result.items[i].description,
          txfrequency: result.items[i].txfrequency,
          rev: result.items[i].rev,
          crypto: result.items[i].crypto,
          frequency: result.items[i].frequency,
          satcom: result.items[i].satcom,
          freqhop: result.items[i].freqhop,
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
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        version: result.version,
        description: result.description,
        txfrequency: result.txfrequency,
        rev: result.rev,
        crypto: result.crypto,
        frequency: result.frequency,
        satcom: result.satcom,
        freqhop: result.freqhop,
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

api.postNets = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.nets, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        version: result.version,
        description: result.description,
        txfrequency: result.txfrequency,
        rev: result.rev,
        crypto: result.crypto,
        frequency: result.frequency,
        satcom: result.satcom,
        freqhop: result.freqhop,
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
      var data = {name: 'delete'};
      cb(null, data);
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
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.roles, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        var temp = {
          id: result.items[i].id,
          name: result.items[i].name,
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
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        description: result.description,
        rev: result.rev,
        version: result.version,
        shared: result.shared,
        autotune_enabled: result.autotune_enabled,
        radiohw: result.radiohw,
        calling_enabled: result.calling_enabled,
        chat_enabled: result.chat_enabled
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

api.postRoles = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.roles, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        description: result.description,
        rev: result.rev,
        version: result.version,
        shared: result.shared,
        autotune_enabled: result.autotune_enabled,
        radiohw: result.radiohw,
        calling_enabled: result.calling_enabled,
        chat_enabled: result.chat_enabled
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
      var data = {name: 'delete'};
      cb(null, data);
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
        var temp = {
          id: result.items[i].id,
          name: result.items[i].name,
          data_type: result.items[i].data_type,
          description: result.items[i].description,
          rev: result.items[i].rev,
          version: result.items[i].version,
          shared: result.items[i].shared,
          default_fill: result.items[i].default_fill,
          net_lock: result.items[i].net_lock,
          sqtail_disabled: result.items[i].sqtail_disabled,
          cipher_enabled: result.items[i].cipher_enabled
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
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        description: result.description,
        rev: result.rev,
        version: result.version,
        shared: result.shared,
        default_fill: result.default_fill,
        net_lock: result.net_lock,
        sqtail_disabled: result.sqtail_disabled,
        cipher_enabled: result.cipher_enabled
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

api.getFills = function(cb) {
  var scn = this;
  var data = [];
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.fills, 'get', cb);
    },
    function(result, cb) {
      for(var i in result.items) {
        var temp = {
          id: result.items[i].id,
          name: result.items[i].name,
          data_type: result.items[i].data_type,
          description: result.items[i].description,
          rev: result.items[i].rev,
          version: result.items[i].version,
          single_net_container: result.items[i].single_net_container,
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
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        description: result.description,
        rev: result.rev,
        version: result.version,
        single_net_container: result.single_net_container,
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

api.postFills = function(data, cb) {
  var scn = this;
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.fills, 'post', JSON.stringify(data), cb);
    },
    function(result, cb) {
      var data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        description: result.description,
        rev: result.rev,
        version: result.version,
        single_net_container: result.single_net_container,
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
      var data = {name: 'delete'};
      cb(null, data);
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
  var data = {};
  async.waterfall([
    function(cb) {
      util.request(scn._scnUrl, 'get', cb);
    },
    function(result, cb) {
      util.request(result.performance_test, 'get', cb);
    },
    function(result, cb) {
      var array = [];
      data = {
        id: result.id,
        name: result.name,
        data_type: result.data_type,
        description: result.description,
        rev: result.rev,
        version: result.version,
        req_match_ver: result.req_match_ver,
        predelay: result.predelay,
        session: result.session,
        duration: result.duration,
        kill_all_remote: result.kill_all_remote
      };

      for(var i in result.clients) {
        var temp = {
          id: result.clients[i].id,
          test_tx: result.clients[i].test_tx,
          tone: result.clients[i].tone,
          test_rx: result.clients[i].test_rx,
          host: result.clients[i].host,
          role: result.clients[i].role,
          randomize: result.clients[i].randomize
        };
        array.push(temp);
      }
      data.clients = array;

      array = [];
      for(var j in result.radios) {
        var temp = {
          sound: result.radios[j].sound,
          net: result.radios[j].net,
          tone_gain: result.radios[j].tone_gain,
          tone_freq: result.radios[j].tone_freq,
          test_rx: result.radios[j].test_rx
        };
        array.push(temp);
      }
      data.radios = array;
      cb(null, data);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};


