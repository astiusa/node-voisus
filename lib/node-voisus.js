// expose api as the module
var api = {};
exports = module.exports = api;

api.createHapi = function(host) {
  var hapi = {};
  hapi = require('./hapi/hapi').createHapi(host);
  hapi.cloud = require('./hapi/hapi.cloud').createCloud(host);
  hapi.scenarios = require('./hapi/hapi.scenarios').createScenarios(host);
  hapi.sessions = require('./hapi/hapi.sessions').createSessions(host);
  return hapi;
};

api.createVoisusClient = function() {
	var voisusClient = {};
	return voisusClient;
};

