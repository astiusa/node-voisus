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
	get_vehicles: function (fn) {
		var msg = this.jrpcClient.Method("get_vehicles", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	get_transmitting: function (fn) {
		var msg = this.jrpcClient.Method("get_transmitting", this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	autotune_radio: function (rmtx_id, r_idx, fn) {
		var msg = this.jrpcClient.Method("autotune_radio", {rmtx_id: rmtx_id, r_idx: r_idx}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_radiomon: function (status, fn) {
		var msg = this.jrpcClient.Method("set_radiomon", {status: status}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_vehicle: function (id, fn) {
		var msg = this.jrpcClient.Method("set_vehicle", {id: id}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_ptt: function (ptt, fn) {
		var msg = this.jrpcClient.Method("set_ptt", {ptt: ptt}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_role: function (id, fn) {
		var msg = this.jrpcClient.Method("set_role", {id: id}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	set_client_name: function (name, fn) {
		var msg = this.jrpcClient.Method("set_client_name", {name: name}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	set_asset: function (idx, fn) {
		var msg = this.jrpcClient.Method("set_asset", {idx: idx}, this.NextID());
		this.Lookup[msg.id] = fn;
		this.jrpcClient.Send(msg);
	},
	keep_alive: function (name, fn) {
		var msg = this.jrpcClient.Method("keep_alive", this.NextID());
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
