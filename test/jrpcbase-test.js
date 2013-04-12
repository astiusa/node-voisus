var should = require('should');
var JRPCBase = require('../src/jrpcbase');

var test = {
	host: "www.asti-usa.com", 
	badHost: "www.def.not.asti-usa.museum", 
	port: 80
}

describe("JRPC Base: ", function () {
	describe("Constructor: ", function () {

		it ("should accept a host and port, and connect on creation and the callback should be executed upon connection.", function (done) {
			var jrpc = new JRPCBase(test.host, test.port, function () { done(); });

			jrpc.disconnect();
		});
	});

	describe ("Basic Functionality: ", function () {

		it ("Allow writing to the page", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);

			jrpc.write('hello world!\r\n', function (data) { done(); } );

			jrpc.disconnect();
		});

		it ("Allow customization of the timeout", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);

			jrpc.setTimeout(500);

			jrpc.disconnect();
			done();
		});

		it ("Create valid messages to server", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
			jrpc.onEnd(function(data) { done(); });

			var msg = jrpc.Method("test");
			jrpc.Message(msg).should.equal('{"jsonrpc":"2.0","id":null,"method":"test","params":{}}\u0000');

			jrpc.disconnect();
		});

		it ("Create be able to send the message", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
			jrpc.onEnd(function(data) { done(); });

			var msg = jrpc.Method("test");
			jrpc.Send(msg);

			jrpc.disconnect();
		});

		it ("Parse messages from server", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
			jrpc.onEnd(function(data) { done(); });

			var res = jrpc.Response('{"jsonrpc":"2.0","id":null,"error": null,"result":""}');

			should.exist(res.jsonrpc);
			should.not.exist(res.id);
			should.not.exist(res.error);
			should.exist(res.result);

			res.jsonrpc.should.equal("2.0");
			res.result.should.equal("");

			jrpc.disconnect();
		});

		describe("Should create valid JRPC Objects: ", function () {
			it ("Empty", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
				jrpc.onEnd(function(data) { done(); });

				var result = jrpc.Method();

				should.not.exist(result);

				jrpc.disconnect();
			});

			it ("Only method", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
				jrpc.onEnd(function(data) { done(); });

				var result = jrpc.Method("test");

				should.exist(result);
				
				should.exist(result.jsonrpc);
				should.not.exist(result.id);
				should.exist(result.method);
				should.exist(result.params);

				Object.keys(result.params).length.should.equal(0);
				result.jsonrpc.should.equal("2.0");
				result.method.should.equal("test");

				jrpc.disconnect();
			});

			it ("Method and params", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
				jrpc.onEnd(function(data) { done(); });

				var result = jrpc.Method("test", {a: 1, b: 2});

				should.exist(result);
				
				should.exist(result.jsonrpc);
				should.not.exist(result.id);
				should.exist(result.method);
				should.exist(result.params);

				Object.keys(result.params).length.should.equal(2);

				result.params.a.should.equal(1);
				result.params.b.should.equal(2);

				result.jsonrpc.should.equal("2.0");
				result.method.should.equal("test");

				jrpc.disconnect();
			});

			it ("Method and params and ID", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
				jrpc.onEnd(function(data) { done(); });

				var result = jrpc.Method("test", {a: 1, b: 2}, 4);

				should.exist(result);
				
				should.exist(result.jsonrpc);
				should.exist(result.id);
				should.exist(result.method);
				should.exist(result.params);

				Object.keys(result.params).length.should.equal(2);

				result.params.a.should.equal(1);
				result.params.b.should.equal(2);
				
				result.id.should.equal(4);
				result.jsonrpc.should.equal("2.0");
				result.method.should.equal("test");

				jrpc.disconnect();
			});
		});
	})

	describe ("Event Subscription: ", function () {
		
		it ("data", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);

			jrpc.onData(function(data) { done(); });
			jrpc.write('hello world!\r\n');

			jrpc.disconnect();
		});

		it ("End", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);

			jrpc.onEnd(function(data) { done(); });

			jrpc.disconnect();
		});

		it ("close", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);
			
			jrpc.onClose(function(data) { done(); });

			jrpc.disconnect();				
		});
		
		it ("error", function (done) {
			var jrpc = new JRPCBase(test.badHost, test.port);

			jrpc.onError(function(data) { done(); });

			jrpc.disconnect();	
		});
		
		it ("timeout", function (done) {
			var jrpc = new JRPCBase(test.host, test.port);

			jrpc.onTimeout(function(data) { done(); });
			jrpc.setTimeout(100);

			setTimeout(function () {
				jrpc.disconnect();	
			}, 300);		
		});
	});
});