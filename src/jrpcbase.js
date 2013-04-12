var net = require('net');
var jsonify = require('jsonify');

var obj;

obj = function (host, port, callback) {
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
		this.client.on('end', fn);
	}
}

module.exports = obj;