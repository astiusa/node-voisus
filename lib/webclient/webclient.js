process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var _ = require('underscore');
var util = require('util');
var io = require('socket.io-client');
var events2 = require('eventemitter2');
var bunyan = require('bunyan');
var clone = require('node-asti').tools.clone;

var EMSG = {
  'ready': 'ready',
  'connect': 'connect',
  'disconnect': 'disconnect',
  'unknownMsg': 'unknownMsg',
  'error': 'error',
  'roles': 'roles',
  'role_set': 'role_set',
  'radio': 'radio',
  'commpanel': 'commpanel'
};

var SMSG = {
  'connect': 'client:connect',
  'response': 'client:response',
  'request': 'client:request'
};

var RADIO_FIELDS = ['netid', 'transmitting', 'receiving', 'nets', 'radioid'];

/*
 * Public API Methods
 */
module.exports = WebClient = function(options) {
  events2.EventEmitter2.call(this);
  this.host = options.host;
  this._DEBUG = options.debug;
  if (options.logger) {
    this.log = options.logger.child({widget: 'webclient', user: options.name});
  }
  else {
    if (this._DEBUG) {
      this.log = bunyan.createLogger({
        name: 'webclient',
        stream: process.stdout,
        level: this._DEBUG_LEVEL || 'trace'
      });
    }
    else {
      this.log = bunyan.createLogger({
        name: 'webclient',
        streams: []
      });
    }
  }

  this._url = 'https://'+this.host+'/webclient';

  this.EVENTS = _.clone(EMSG);

  this._roles = {};
  //this._roles = [];

  this._client = {};
  this._client.name = options.name || 'node-voisus.WebClient';
  this._client.radios = {};

  this._socket = io.connect(this._url, {'force new connection': true});

  this._setupEventHandlers();
};
util.inherits(WebClient, events2.EventEmitter2);

WebClient.prototype.connect = function connect() {
  var method = 'authorize_client';
  var data = {
    name: this._client.name
  };
  this._send(SMSG.connect, method, data);
};

WebClient.prototype.disconnect = function disconnect() {
  this._socket.disconnect();
};

WebClient.prototype.setRole = function setRole(role) {
  this.tmpRole = role;
  this._send(SMSG.request, 'set_role', {
    roleid: role.roleid
  });
};

WebClient.prototype.getRoles = function getRoles() {
  return clone(this._client.roles);
};

WebClient.prototype.getRadios = function getRadios() {
  return clone(this._client.radios);
};

WebClient.prototype.getCommpanel = function getCommpanel() {
  return clone(this._client.commpanel);
};

WebClient.prototype.setTx = function setTx(radioidx, value) {
  var d =  {
    commpanelid: this._client.commpanel.commpanelid,
    radioidx: radioidx,
    txenable: value
  };
  this._send(SMSG.request, 'set_txenable', d);
};

WebClient.prototype.setRx = function setRx(radioidx, value) {
  var d =  {
    commpanelid: this._client.commpanel.commpanelid,
    radioidx: radioidx,
    rxenable: value
  };
  this._send(SMSG.request, 'set_rxenable', d);
};

WebClient.prototype.setPtt = function(value) {
  var d = {
    commpanelid: this._client.commpanel.commpanelid,
    ptt: value
  };
  this._send(SMSG.request, 'set_ptt', d);
  //self.audioClient.ptt = value;
};

WebClient.prototype.setupAudio = function setupAudio(id, port, sampleRate) {
  var d = {
    name: this._client.name,
    port: port,
    sample_rate: sampleRate
  };

  this._send(SMSG.request, 'setup_audio', d);
};


/*
 * this.connect = function(name) {
      var msg = self._wrap('authorize_client', {
        name: name
      });
      client.name = name;
      self.socket.emit("client:connect", msg);
      $cookieStore.put("webClientName", name);

    };

    this.disconnect = function() {
      self.socket.emit("client:disconnect");
      var name = client.name;
      var role = client.role;
      resetClient();
      client.name = name;
      angular.extend(client.role,role);
      self.audioClient.disconnect();
      client.connected = false;
      if (client.heartbeat_timeout) {
        $interval.cancel(client.heartbeat_timeout);
      }
      client.heartbeat_timeout = null;
    };
 */



/*
 * Utility Methods
 */
WebClient.prototype._emit = function _emit(type, data) {
  this.log.debug({event: type, data: data}, 'WebClient emitting event');
  this.emit(type, data);
};


WebClient.prototype._send = function _send(type, method, data) {
  var msg = {
    method: method,
    data: data || {}
  }
  this.log.debug({type: type, payload: msg}, 'WebClient sending data to server');
  this._socket.emit(type, msg);
}

WebClient.prototype._getRoles = function() {
  this._send(SMSG.request, 'get_roles');
};

WebClient.prototype._sendHeartbeat = function _sendHeartbeat() {
  this._send(SMSG.request, 'client_heartbeat');
};

WebClient.prototype._doHeartbeat = function _doHeartbeat() {
  this._sendHeartbeat();

  this._client._heartbeat_timeout = setInterval(this._sendHeartbeat.bind(this), 5000);
};

/*
 * Event handlers
 */

WebClient.prototype._setupEventHandlers = function _setupEventHandlers() {
  this._socket.on('connect', this._connectHandler.bind(this));
  this._socket.on('disconnect', this._disconnectHandler.bind(this));
  this._socket.on('client:response', this._parseResponseHandler.bind(this));
  this._socket.on('error', this._errorHandler.bind(this));
  //this._socket.on('client:response', this._parseResponseHandler.bind(this));
}

WebClient.prototype._errorHandler = function _errorHandler(err) {
  this.log.error({err: err}, 'errorHandler executing');
  this._emit(EMSG.error, err);
}

WebClient.prototype._connectHandler = function _connectHandler() {
  this.log.trace('Connection to Voisus server enabled, emitting READY');
  this._emit(EMSG.ready);
}

WebClient.prototype._disconnectHandler = function _disconnectHandler() {
  this.log.info('Disconnecting from Voisus Server');
  if (this._client._heartbeat_timeout) {
    clearInterval(this._client._heartbeat_timeout);
  }
  this._emit(EMSG.disconnect);
};

WebClient.prototype._authorizeClient = function(data) {
  if (data.redirect) {
    //If we have a redirect, we need to connect the client
    //to another target box. Either directly connect his client
    //or broadcast a message to controller to have the browser
    //redirect to that box?
    var pass;
  }
  this._client.connected = data.authorized;
  this._emit(EMSG.connect);
  this._doHeartbeat();
  this._getRoles();
  /*var path = $location.host() + ":8080";
  try {
    self.audioClient = new AudioClient(path, function(data, sampleRate) {
      self.sendRequest(self._wrap('setup_audio', {
        name: client.name,
        port: data.port,
        sample_rate: sampleRate
      }));
      self.audioEnabled.value = true;
    });
  } catch (e) {
    console.log("Error trying to create Audio Client", e);
    self.audioEnabled.value = false;
  }*/
};

WebClient.prototype._updateRoles = function(data) {
  this._client.roles = data.roles;
  this._emit(EMSG.roles, this._client.roles);
  /*if (data.roles.length === 1 && !client.role) {
    client.role = data.roles[0].roleid;
    self.setRole(data.roles[0].roleid);
  }*/
};

WebClient.prototype._parseRadio = function _parseRadio(data) {
  // WARNING!!
  // This doesn't properly delete fields that have been removed
  // i.e. if a net is removed from a radio, this won't update properly
  var radio = {};
  _.each(RADIO_FIELDS, function(prop) {
    radio[prop] = data[prop];
  }, this);
  if (!this._client.radios[radio.radioid]) {
    this._client.radios[radio.radioid] = {};
  }
  _.extend(this._client.radios[radio.radioid], radio);
  this._emit(EMSG.radio, radio);
  this.log.trace({radio: radio, client_name: this._client.name},
                 'parsed updated radio for client');
};

WebClient.prototype._parseCommpanel = function _parseCommpanel(data) {
  this._client.commpanel = data;
  this._emit(EMSG.commpanel);
  this.log.debug({commpanel: data}, 'parsed updated commpanel for client');
  // WARNING!!
  // This doesn't properly delete fields that have been removed
  // i.e. if a net is removed from a radio, this won't update properly
};

WebClient.prototype._resetClientRole = function _resetClientRole() {
  this._client.role = _.clone(this.tmpRole);
  this._emit(EMSG.role_set, this._client.role);
  this.tmpRole = null;
};

WebClient.prototype._parseResponseHandler = function _parseResponseHandler(data) {

  var d = data.data;
  var method = data.method;
  if (!method) {
    this.log.warn(data, "Unrecognized client response ");
    this._emit(EMSG.unknownMsg, data);
  }
  this.log.trace({method: method, data: d},"response from voisus server");
  switch (method) {
    case "authorize_client":
      this._authorizeClient(d);
      break;
    case "update_roles":
      this._updateRoles(d);
      break;
    case "set_role":
      if (d) {
        this._resetClientRole();
      }
      break;
    case "update_radio":
      this._parseRadio(d);
      break;
    case "update_commpanel_ptt":
      this._client.ptt = d;
      break;
    case "update_commpanel":
      this._parseCommpanel(d);
      break;
  /*
    case "setup_audio":
      self.audioClient.start();
      break;
*/
    case "server_heartbeat":
      this.log.trace("server_heartbeat");
      break;
  }
};

/*


    var self = this;
  this._roles = {};
  this.roles = [];

  this.socket = svcSocket.getWebClientSocket();
  this.socket.on("client:response", function(data) {
    self.parseResponse(data);
  });

  this.audioEnabled = {value: false};

  var tempRole = null;
  var client = {};
  client.role = {};
  client._radios = {};
  client.radios = [];
  client.state = {};
  client.heartbeat_timeout = null;
  client.connected = false;

  var resetClient = function () {
    client.name = null;
    client.ptt = false;
    angular.extend(client.role, {
      autotune_enabled : false,
      roleid : '',
      rolename : ''
    });
    angular.extend(client.state, {
      pttOpt : 'momentary',
      compressed : false
    });
    client._radios = {};
    client.radios.empty();
  };
  resetClient();

  this.getClient = function () {
    return client;
  };

  this.getClientState = function () {
    return client.state;
  };

  this.getClientRole = function () {
    return client.role;
  };

  this.parseResponse = function(data) {
    var d = data.data;
    var method = data.method;
    if (angular.isUndefined(method)) {
      console.log("Unrecognized client response ", data);
      return;
    }
    //console.log(method,"response:",d);
    switch (method) {
      case "authorize_client":
        this.authorizeClient(d);
        break;
      case "setup_audio":
        self.audioClient.start();
        break;
      case "get_vehicles":
        break;
      case "set_role":
        if (d) {
          self.resetClientRole(tempRole);
        }
        break;
      case "update_roles":
        this.updateRoles(d);
        break;
      case "update_vehicles":
        break;
      case "update_radio":
        this.parseRadio(d);
        break;
      case "update_vehicle_radio":
        break;
      case "update_commpanel":
        this.parseCommpanel(d);
        break;
      case "update_commpanel_ptt":
        client.ptt = d;
        break;
      case "update_vehicle_commpanel":
        break;
      case "server_heartbeat":
        //console.log("server_heartbeat");
        break;
    }
  };

    this._wrap = function(method, data) {
      if (angular.isUndefined(data)) {
        data = {};
      }
      return {
        method: method,
        data: data
      };
    };

    this.sendHeartbeat = function() {
      self.sendRequest(self._wrap('client_heartbeat', {}));
    };

    this.doHeartbeat = function() {
      self.sendHeartbeat();
      client.heartbeat_timeout = $interval(self.sendHeartbeat, 5000);
    };

    this.authorizeClient = function(data) {
      if (data.redirect) {
        //If we have a redirect, we need to connect the client
        //to another target box. Either directly connect his client
        //or broadcast a message to controller to have the browser
        //redirect to that box?
        var pass;
      }
      client.connected = data.authorized;
      self.doHeartbeat();
      self.getRoles();
      var path = $location.host() + ":8080";
      try {
        self.audioClient = new AudioClient(path, function(data, sampleRate) {
          self.sendRequest(self._wrap('setup_audio', {
            name: client.name,
            port: data.port,
            sample_rate: sampleRate
          }));
          self.audioEnabled.value = true;
        });
      } catch (e) {
        console.log("Error trying to create Audio Client", e);
        self.audioEnabled.value = false;
      }

      var cR = $cookieStore.get("webClientRole");
      if (cR) {
        self.setRole(cR);
        var cS = $cookieStore.get("webClientState");
        if (cS) {
          angular.extend(client.state, cS);
        }
      }


    };

    this.sendRequest = function(msg) {
      self.socket.emit("client:request", msg);
    };


    this.connect = function(name) {
      var msg = self._wrap('authorize_client', {
        name: name
      });
      client.name = name;
      self.socket.emit("client:connect", msg);
      $cookieStore.put("webClientName", name);

    };

    this.disconnect = function() {
      self.socket.emit("client:disconnect");
      var name = client.name;
      var role = client.role;
      resetClient();
      client.name = name;
      angular.extend(client.role,role);
      self.audioClient.disconnect();
      client.connected = false;
      if (client.heartbeat_timeout) {
        $interval.cancel(client.heartbeat_timeout);
      }
      client.heartbeat_timeout = null;
    };

    this.resetClientRole = function(role) {
      var name = client.name;
      var state = angular.copy(client.state);
      resetClient();
      client.name = name;
      angular.extend(client.role, role);
      angular.extend(client.state, state);
    };

    this.getRoles = function() {
      self.sendRequest(self._wrap('get_roles'));
    };

    this.updateArrayMapper = function(M, A, idattr, items, ufunc, itemGetter) {
      if (angular.isUndefined(ufunc)) {
        ufunc = function(o, n) {
          angular.extend(o, n);
        };
      }
      var currItems = _.map(A, function(item) {
        return item[idattr];
      });
      var newItems = _.map(items, function(item) {
        return item[idattr];
      });
      //Remove deleted items
      var todelete = _.difference(currItems, newItems);
      angular.forEach(todelete, function(id) {
        delete M[id];
        //find the object in the array and remove it
        var index, i;
        for (i = 0; i < A.length; i++) {
          if (A[i][idattr] === id) {
            index = i;
            break;
          }
        }
        if (index) {
          A.remove(index);
        }
      });
      //Add new items and update existing ones
      var item;
      angular.forEach(items, function(obj, index) {
        if (angular.isDefined(itemGetter)) {
          item = itemGetter(obj[idattr]);
        } else {
          item = M[obj[idattr]];
          if (angular.isUndefined(item)) {
            item = {};
            M[obj[idattr]] = item;
            A.push(item);
          }
        }
        item.__index__ = index;
        ufunc(item, obj);
      });
    };

    this.updateRoles = function(data) {
      self.updateArrayMapper(self._roles, self.roles, "roleid", data.roles);
      if (data.roles.length === 1 && !client.role) {
        client.role = data.roles[0].roleid;
        self.setRole(data.roles[0].roleid);

      }
    };

    this.getRadio = function(rid) {
      var radio = client._radios[rid];
      if (angular.isUndefined(radio)) {
        radio = {
          nets: [],
          _nets: {}
        };
        client._radios[rid] = radio;
        client.radios.push(radio);
      }
      return radio;
    };

    this.parseCommpanel = function(data) {
      client.ptt = data.ptt;
      client.commpanelid = data.commpanelid;
      self.updateArrayMapper(client._radios, client.radios, "radioid", data.radios,
        undefined, self.getRadio);
    };

    this.parseRadio = function(data) {
      var radio = self.getRadio(data.radioid);
      angular.forEach(['netlock', 'netid', 'receiving',
          'transmitting', 'radiotype', 'cipherenabled'
        ],
        function(attr) {
          radio[attr] = data[attr];
        });
      self.updateArrayMapper(radio._nets, radio.nets, "netid", data.nets);
    };

    this.setRole = function(role) {
      self.sendRequest(self._wrap('set_role', {
        roleid: role.roleid
      }));
      tempRole = role;
      client.state.compressed = true;
      var save = angular.extend({}, role);
      delete save.__index__;
      $cookieStore.put("webClientRole", save);
    };

    this.setTx = function(radio) {
      var tx = !radio.txenable;
      var rx = radio.rxenable;
      if (tx) {
        rx = true;
      }
      self.updateRxTx(radio, rx, tx);
    };

    this.setRx = function(radio) {
      var tx = radio.txenable;
      var rx = !radio.rxenable;
      if (!rx) {
        tx = false;
      }
      self.updateRxTx(radio, rx, tx);
    };

    this.updateRxTx = function (radio, rx, tx) {
      var d = {
        commpanelid: client.commpanelid,
        radioidx: radio.__index__,
        rxenable: rx
      };
      self.sendRequest(self._wrap('set_rxenable', d));
      d = {
        commpanelid: client.commpanelid,
        radioidx: radio.__index__,
        txenable: tx
      };
      self.sendRequest(self._wrap('set_txenable', d));
    };

    this.setVol = function(radio, delta) {
      var vol = radio.volume + delta;
      if (vol < 0) {
        vol = 0;
      } else if (vol > 10) {
        vol = 10;
      }
      var d = {
        commpanelid: client.commpanelid,
        radioidx: radio.__index__,
        volume: vol
      };
      self.sendRequest(self._wrap('set_volume', d));
    };

    this.setPtt = function(value) {
      var d = {
        commpanelid: client.commpanelid,
        ptt: value
      };
      self.sendRequest(self._wrap('set_ptt', d));
      self.audioClient.ptt = value;

    };

    this.setRadioNet = function(radio, net) {
      var d = {
        radioid: radio.radioid,
        netid: net.netid
      };
      self.sendRequest(self._wrap('set_radio_net', d));
    };

    this.setClientState = function () {
      $cookieStore.put("webClientState", client.state);
    };

    var cN = $cookieStore.get("webClientName");
    if (cN) {
      self.connect(cN);
    }

    return self;
  });

  wc.controller("WebClientCtrl", function($scope, svcWebClient, svcFeatures) {
    $scope.roles = svcWebClient.roles;
    $scope.client = svcWebClient.getClient();
    $scope.cState = svcWebClient.getClientState();
    $scope.cRole = svcWebClient.getClientRole();
    $scope.audioEnabled = svcWebClient.audioEnabled;

    $scope.clientNames = [];
    $scope.pttPressed = false;
    $scope.pttLatched = false;
    $scope.browserSupport = !window.Modernizr.webaudio && !window.Modernizr.websockets;
    $scope.webclientFeature = svcFeatures.getFeature('webaudio');
    $scope.connectClient = function() {
      if ($scope.connClientForm.$invalid) {
        return;
      }
      svcWebClient.connect($scope.client.name);
    };

    $scope.disconnectClient = function() {
      svcWebClient.disconnect();
    };

    $scope.setRole = function(role) {
      svcWebClient.setRole(role);
    };

    $scope.radioEvenSpan = function(r) {
      if (angular.isUndefined(r)) {
        return false;
      }
      return r.__index__ % 2 === 0;
    };

    $scope.radioOddSpan = function(r) {
      if (angular.isUndefined(r)) {
        return false;
      }
      return r.__index__ % 2 === 1;
    };

    $scope.pttDown = function() {
      if (_.find($scope.client.radios, function (r) {
        return r.txenable === true;
      })) {
        $scope.pttPressed = true;
        svcWebClient.setPtt(true);
      }
    };

    $scope.pttUp = function(latch) {
      if (latch) {
        $scope.pttLatched = !$scope.pttLatched;
        if ($scope.pttLatched){
          return;
        }
      }

      $scope.pttPressed = false;
      svcWebClient.setPtt(false);
    };

    $scope.setClientState = function (attr, value) {
      svcWebClient.setClientState(attr, value);
    };

  });

  wc.directive("cpradio", function(svcWebClient) {
    return {
      scope: {
        radio: '='
      },
      replace: true,
      restrict: 'E',
      templateUrl: '/webclient/html/cp_radio.html',
      controller: function($scope) {
        $scope._volUpPress = false;
        $scope._voldnPress = false;
        $scope._netpress = false;
        $scope._pnlPress = false;
        $scope.setTx = function() {
          svcWebClient.setTx($scope.radio);
        };

        $scope.setRx = function() {
          svcWebClient.setRx($scope.radio);
        };

        $scope.incVol = function() {
          $scope._volUpPress = false;
          svcWebClient.setVol($scope.radio, +1);
        };

        $scope.decVol = function() {
          $scope._volDnPress = false;
          svcWebClient.setVol($scope.radio, -1);
        };

        $scope.changeToPanel = function() {
          $scope._pnlPress = false;
        };

        $scope.showNetList = function() {
          $scope._netpress = false;
          $scope._shownetlist = !$scope._shownetlist;
        };

        $scope.setRadioNet = function(net) {
          $scope._shownetlist = false;
          svcWebClient.setRadioNet($scope.radio, net);
        };

      }
    };
  });

  wc.filter("radioTypeLabel", function(svcConstants) {
    var map = {};
    map[svcConstants.ROLE_PRC117F] = '117F';
    map[svcConstants.ROLE_PRC117G] = '117G';
    map[svcConstants.ROLE_PRC148] = '148';
    map[svcConstants.ROLE_PRC152] = '152';
    map[svcConstants.ROLE_PRC119] = '119';
    map[svcConstants.ROLE_SINCGARS] = 'SINCGARS';
    map[svcConstants.ROLE_GENERIC_RADIO] = 'RADIO';
    return function(val) {
      var v = map[val];
      if (angular.isUndefined(v)) {
        return val;
      }
      return v;
    };
  });

}(window, window.angular));
*/