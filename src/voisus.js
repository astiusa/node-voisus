var net = require('net');
var jsonify = require('jsonify');

var API = {
	Connect: function (host, port) 
	{
		var client = net.connect({host: host, port: port}, function() { 
		  	console.log('client connected');
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
	Send: function (jrpcObj, callback)
	{
		client.write(jsonify.stringify(jrpcObj), callback)
	},
	Commands: {
		ping: function (id, callback) {
			var obj = API.JRPCObj("ping",
				{},
				id);
			API.Send(obj, callback);
		}, 
		connect: function (addr, id, callback) {
			var obj = API.JRPCObj("connect",
				{ addr: addr },
				id);
			API.Send(obj, callback);
		},
		keep_alive: function (id, callback) {
			var obj = API.JRPCObj("keep_alive",
				{},
				id);
			API.Send(obj, callback);
		},
		disconnect: function (id, callback) {
			var obj = API.JRPCObj("disconnect",
				{},
				id);
			API.Send(obj, callback);
		},
		get_operators: function (id, callback) {
			var obj = API.JRPCObj("get_operators",
				{},
				id);
			API.Send(obj, callback);
		},
		get_assets: function (id, callback) {
			var obj =  API.JRPCObj("get_assets",
				{},
				id);
			API.Send(obj, callback);
		},
		get_connection: function (id, callback) {
			var obj = API.JRPCObj("get_connection",
				{},
				id);
			API.Send(obj, callback);
		},
		get_client_name: function (id, callback) {
			var obj = API.JRPCObj("get_client_name",
				{},
				id);
			API.Send(obj, callback);
		},
		get_curr_role: function (id, callback) {
			var obj = API.JRPCObj("get_curr_role",
				{},
				id);
			API.Send(obj, callback);
		},
		get_analyzer_results: function (id, callback) {
			var obj = API.JRPCObj("get_analyzer_results",
				{},
				id);
			API.Send(obj, callback);
		},
		get_asset_nets: function (id, callback) {
			var obj = API.JRPCObj("get_asset_nets",
				{},
				id);
			API.Send(obj, callback);
		},
		get_network_settings: function (id, callback) {
			var obj = API.JRPCObj("get_network_settings",
				{},
				id);
			API.Send(obj, callback);
		},
		get_headset_settings: function (id, callback) {
			var obj = API.JRPCObj("get_headset_settings",
				{},
				id);
			API.Send(obj, callback);
		},
		get_roles: function (id, callback) {
			var obj = API.JRPCObj("get_roles",
				{},
				id);
			API.Send(obj, callback);
		},
		get_vehicles: function (id, callback) {
			var obj = API.JRPCObj("get_vehicles",
				{},
				id);
			API.Send(obj, callback);
		},
		get_transmitting: function (id, callback) {
			var obj = API.JRPCObj("get_transmitting",
				{},
				id);
			API.Send(obj, callback);
		},
		get_versions: function (id, callback) {
			var obj = API.JRPCObj("get_versions",
				{},
				id);
			API.Send(obj, callback);
		},
		start_analyzer: function (id, callback) {
			var obj = API.JRPCObj("start_analyzer",
				{},
				id);
			API.Send(obj, callback);
		},
		stop_analyzer: function (id, callback) {
			var obj = API.JRPCObj("stop_analyzer",
				{},
				id);
			API.Send(obj, callback);
		},
		set_radiomon: function (/* Integer 1 on 0 off */ status, id, callback) {
			var obj = API.JRPCObj("set_radiomon",
				{status: status},
				id);
			API.Send(obj, callback);
		},
		autotune_radio: function (id, callback) {
			var obj = API.JRPCObj("autotune_radio",
				{},
				id);
			API.Send(obj, callback);
		},
		set_vehicle: function (vehicle_id, id, callback) {
			var obj = API.JRPCObj("set_vehicle",
				{id: vehicle_id},
				id);
			API.Send(obj, callback);
		},
		set_ptt: function (/* number */ ptt, id, callback) {
			var obj = API.JRPCObj("set_ptt",
				{ptt : ptt},
				id);
			API.Send(obj, callback);
		},
		set_role: function (role_id, id, callback) {
			var obj = API.JRPCObj("set_role",
				{id: role_id},
				id);
			API.Send(obj, callback);
		},
		set_asset: function (id, callback) {
			var obj = API.JRPCObj("set_asset",
				{},
				id);
			API.Send(obj, callback);
		},
		set_client_name: function (/* string */ name, id, callback) {
			var obj = API.JRPCObj("set_client_name", 
				{name: name}, 
				id);
			API.Send(obj, callback);
		},
		set_test_mode: function (mode, id, callback) {
			var obj = API.JRPCObj("set_test_mode",
				{mode: mode},
				id);
			API.Send(obj, callback);
		},
		set_world_pos: function (/* number */ xCoord, /* number */ yCoord, /* number */ zCoord, id, callback) {
			var obj = API.JRPCObj("set_world_pos", 
				{xcoord: xCoord, ycoord: yCoord, zcoord: zCoord}, 
				id);
			API.Send(obj, callback);
		}
	},
}

module.exports = API;