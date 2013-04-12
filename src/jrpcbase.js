var net = require('net');
var jsonify = require('jsonify');

var obj = function (host, port, callback) {
  	this.host = host;
  	this.port = port;

  	this.client = net.connect({host: host, port: port}, callback);
};

obj.prototype = {
	disconnect : function (data, encoding) {
		this.client.end(data, encoding);
	},
	write : function (message, fn) {
		this.client.write(message, 'UTF-8', fn);
	},
	setTimeout : function (val, fn) {
		this.client.setTimeout(val, fn);
	},

	/** JRPC Processing **/

	Method: function (method, params, id) {

		if (typeof(method) !== 'string')
			return null;
		
		if (typeof(params) === 'undefined')
			params = {};

		if (typeof(id) === 'undefined')
			id = null;

		return { jsonrpc: "2.0", id: id, method: method, params: params };
	},
	
	Message : function (obj) {
		return jsonify.stringify(obj) + "\u0000";
	},

	Response : function (json) {
		return jsonify.parse(json);
	},

	/** Events **/
	onData : function (fn) {
		this.client.on('data', fn);
	},
	onTimeout : function (fn) {
		this.client.on('timeout', fn);
	},
	onClose : function (fn) {
		this.client.on('close', fn);
	},
	onError : function (fn) {
		this.client.on('error', fn);
	},
	onEnd : function (fn) {
		console.log("" + fn);
		this.client.on('end', fn);
	}
}

module.exports = obj;