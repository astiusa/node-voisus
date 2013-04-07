var net = require('net');
var jsonify = require('jsonify');

var API = {
	Connect: function (host, port) 
	{
		var client = net.connect({host: host, port: port}, function() { 
		  	console.log('client connected');
		  	client.write(jsonify.stringify(Commands.ping) + "\0");
		});

		client.on('data', function(data) {
			console.log(jsonify.parse(data.toString()));
		 	client.end();
		});

		client.on('end', function() {
		  	console.log('client disconnected');
		});
	},
	JRPCObj: function (_method, _params, _id)
	{
		if (typeof(_method) !== 'string')
			return null;
		if (typeof(_params) === 'undefined')
			_params = {};
		if (typeof(_id) === 'undefined')
			_id = null;

		return { jsonrpc: "2.0", id: _id, method: _method, params: _params};
	},
	JRPCString: function (jrpcObj)
	{
		return jsonify.stringify(jrpcObj) + "\0"; 
	},
	Commands: {
		ping: function (id) {
			return API.JRPCObj("ping",{},id);
		}, 
		connect: function (addr, id) {
			return API.JRPCObj("connect",{ addr: addr },id);
		},
		keep_alive: function (id) {
			return API.JRPCObj("keep_alive",{},id);
		},
		disconnect: function (id) {
			return API.JRPCObj("disconnect",{},id);
		},
		get_operators: function (id) {
			return API.JRPCObj("get_operators",{},id);
		},
		get_assets: function (id) {
			return API.JRPCObj("get_assets",{},id);
		},
		get_connection: function (id) {
			return API.JRPCObj("get_connection",{},id);
		},
		get_client_name: function (id) {
			return API.JRPCObj("get_client_name",{},id);
		},
		get_curr_role: function (id) {
			return API.JRPCObj("get_curr_role",{},id);
		},
		get_analyzer_results: function (id) {
			return API.JRPCObj("get_analyzer_results",{},id);
		},
		get_asset_nets: function (id) {
			return API.JRPCObj("get_asset_nets",{},id);
		},
		get_network_settings: function (id) {
			return API.JRPCObj("get_network_settings",{},id);
		},
		get_headset_settings: function (id) {
			return API.JRPCObj("get_headset_settings",{},id);
		},
		get_roles: function (id) {
			return API.JRPCObj("get_roles",{},id);
		},
		get_vehicles: function (id) {
			return API.JRPCObj("get_vehicles",{},id);
		},
		get_transmitting: function (id) {
			return API.JRPCObj("get_transmitting",{},id);
		},
		get_versions: function (id) {
			return API.JRPCObj("get_versions",{},id);
		},
		start_analyzer: function (id) {
			return API.JRPCObj("start_analyzer",{},id);
		},
		stop_analyzer: function (id) {
			return API.JRPCObj("stop_analyzer",{},id);
		},
		set_radiomon: function (id) {
			return API.JRPCObj("set_radiomon",{},id);
		},
		autotune_radio: function (id) {
			return API.JRPCObj("autotune_radio",{},id);
		},
		set_vehicle: function (id) {
			return API.JRPCObj("set_vehicle",{},id);
		},
		set_ptt: function (id) {
			return API.JRPCObj("set_ptt",{},id);
		},
		set_role: function (id) {
			return API.JRPCObj("set_role",{},id);
		},
		set_asset: function (id) {
			return API.JRPCObj("set_asset",{},id);
		},
		set_client_name: function (id) {
			return API.JRPCObj("set_client_name",{},id);
		},
		set_test_mode: function (id) {
			return API.JRPCObj("set_test_mode",{},id);
		},
		set_world_pos: function (x,y,z,id) {
			return API.JRPCObj("set_world_pos",{},id);
		}
	},
}

module.exports = API;