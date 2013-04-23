var JRPCBase = require("./jrpcbase");

var obj = function (host, port, callback) {
	var that = this;
	this.jrpcClient = new JRPCBase(host, port, callback);

	this.onData(function (responseMsg) {
		var response = that.jrpcClient.Response(responseMsg.toString());

		if (typeof(that.Lookup[response.id]) === 'undefined')
			return;

		var func = that.Lookup[response.id];

		that.Lookup[response.id] = undefined;

		func(response);
	});
};

obj.prototype = {
	jrpcClient: {},
	id: 0,
	Lookup: {},
	NextID : function () {
		return this.id++;
	},

	Disconnect: function (data, encoding) {
		this.jrpcClient.disconnect(data, encoding);
	},
	SetTimeout : function (val, fn) {
		this.jrpcClient.setTimeout(val, fn);
	},

	Send: function (msg, fn) {
		this.jrpcClient.Send(msg, fn);
	},

	/** Begin Commands **/
	ping: function (fn) {
		var msg = this.jrpcClient.Method("ping", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},

	connect: function (addr, fn) {
		var msg = this.jrpcClient.Method("connect", { addr: addr }, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},

	disconnect: function (fn) {
		var msg = this.jrpcClient.Method("disconnect", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_versions: function (fn) {
		var msg = this.jrpcClient.Method("get_versions", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_assets: function (fn) {
		var msg = this.jrpcClient.Method("get_assets", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_operators: function (fn) {
		var msg = this.jrpcClient.Method("get_operators", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_world_pos: function (xCoord, yCoord, zCoord, fn) {
		var msg = this.jrpcClient.Method("set_world_pos", {xcoord: xCoord, ycoord: yCoord, zcoord: zCoord}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_test_mode: function (mode, fn) {
		var msg = this.jrpcClient.Method("set_test_mode", {mode: mode.toString()}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_connection: function (fn) {
		var msg = this.jrpcClient.Method("get_connection", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_client_name: function (fn) {
		var msg = this.jrpcClient.Method("get_client_name", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_curr_role: function (fn) {
		var msg = this.jrpcClient.Method("get_curr_role", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_asset_nets: function (fn) {
		var msg = this.jrpcClient.Method("get_asset_nets", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_analyzer_results: function (fn) {
		var msg = this.jrpcClient.Method("get_analyzer_results", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_network_settings: function (fn) {
		var msg = this.jrpcClient.Method("get_network_settings", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_headset_settings: function (fn) {
		var msg = this.jrpcClient.Method("get_headset_settings", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_roles: function (fn) {
		var msg = this.jrpcClient.Method("get_roles", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	start_analyzer: function (fn) {
		var msg = this.jrpcClient.Method("start_analyzer", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	stop_analyzer: function (fn) {
		var msg = this.jrpcClient.Method("stop_analyzer", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},

	/** Events **/
	onEnd : function (fn) { 
		this.jrpcClient.onEnd(fn);
	},
	onTimeout : function (fn) { 
		this.jrpcClient.onTimeout(fn);
	},
	onClose : function (fn) { 
		this.jrpcClient.onClose(fn);
	},
	onError : function (fn) { 
		this.jrpcClient.onError(fn);
	},
	onData : function (fn) { 
		this.jrpcClient.onData(fn);
	},
};

module.exports = obj;
/*
var API = {
		keep_alive: function (id, callback) {
			var obj = API.JRPCObj("keep_alive",
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
		stop_analyzer: function (id, callback) {
			var obj = API.JRPCObj("stop_analyzer",
				{},
				id);
			API.Send(obj, callback);
		},
		set_radiomon: function (/* Integer 1 on 0 off * / status, id, callback) {
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
		set_ptt: function (/* number * / ptt, id, callback) {
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
		set_client_name: function (/* string * / name, id, callback) {
			var obj = API.JRPCObj("set_client_name", 
				{name: name}, 
				id);
			API.Send(obj, callback);
		},
	},
}*/
