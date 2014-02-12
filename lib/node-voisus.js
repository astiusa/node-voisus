var api = {};
exports = module.exports = api;

var WebClient = require('./webclient/webclient');

api.createHapi = function(host) {
  var hapi = {};
  hapi = require('./hapi/hapi').init(host);
  return hapi;
};

api.createWebClient = function(options) {
  return new WebClient(options);
};
