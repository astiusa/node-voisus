var hapi = require('./src/hapi');


var h = new hapi('166.78.248.5');

var radios = function() {
  h.getNumRadios(function(err, numRadios) {
    if (numRadios !== undefined) {
      console.log('Radios: '+numRadios);
    }
    setTimeout(radios, 10000);
  });
};

var clients = function() {
  h.getNumClients(function(err, numClients) {
    if (numClients !== undefined) {
      console.log('Clients: '+numClients);
    }
    setTimeout(clients, 10000);
  });
};

var perf = function() {
  h.getPerfmon(function(err, perfmon) {
    if (perfmon) {
      console.log(perfmon);
    }
    setTimeout(perf, 10000);
  });
};

radios();
clients();
//perf();
