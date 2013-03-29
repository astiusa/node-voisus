var net = require('net');
var jsonify = require('jsonify');

var Commands = {
	ping: {
		jsonrpc: "2.0", 
		id: null,
		method: "ping",
		params: {}
	}, 
	keep_alive: {
		jsonrpc: "2.0", 
		id: null,
		method: "keep_alive",
		params: {}		
	},
	disconnect: {
		jsonrpc: "2.0", 
		id: null,
		method: "disconnect",
		params: {}		
	},
	get_operators: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_operators",
		params: {}		
	},
	get_assets: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_assets",
		params: {}		
	},
	get_connection: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_connection",
		params: {}		
	},
	get_client_name: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_client_name",
		params: {}		
	},
	get_curr_role: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_curr_role",
		params: {}		
	},
	get_analyzer_results: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_analyzer_results",
		params: {}		
	},
	get_asset_nets: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_asset_nets",
		params: {}		
	},
	get_network_settings: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_network_settings",
		params: {}		
	},
	get_headset_settings: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_headset_settings",
		params: {}		
	},
	get_roles: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_roles",
		params: {}		
	},
	get_vehicles: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_vehicles",
		params: {}		
	},
	get_transmitting: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_transmitting",
		params: {}		
	},
	get_versions: {
		jsonrpc: "2.0", 
		id: null,
		method: "get_versions",
		params: {}		
	}
}

console.log(jsonify.stringify(Commands));

var client = net.connect({host: "10.26.0.117", port: 51234},
    function() { //'connect' listener
  console.log('client connected');
  client.write(jsonify.stringify(Commands.get_assets) + "\0");
  client.write(jsonify.stringify(Commands.get_versions) + "\0");
  client.write(jsonify.stringify(Commands.get_network_settings) + "\0");
});

client.on('data', function(data) {
  console.log(jsonify.parse(data.toString()));
  client.end();
});

client.on('end', function() {
  console.log('client disconnected');
});
