var api = {};
exports = module.exports = api;

api.createHapi = function(host) {
  var hapi = {};
  hapi = require('./hapi/hapi').init(host);
  return hapi;
};

api.createVoisusClient = function() {
  var voisusClient = {};
  return voisusClient;
};
