var should = require('should');
var JRPCBase = require('../src/jrpcbase');

describe("JRPC Base: ", function () {
	describe("Constructor: ", function () {

		it ("should accept a host and port, and connect on creation and the callback should be executed upon connection.", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { done(); });

			jrpc.disconnect();
		});
	});

	describe ("Basic Functionality: ", function () {

		it ("should allow writing to the page", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { });

			jrpc.write('hello world!\r\n', function (data) { done(); } );

			jrpc.disconnect();
		});

		it ("should allow customization of the timeout", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { });

			jrpc.setTimeout(500);

			jrpc.disconnect();
			done();
		});
	})

	describe ("Event Subscription: ", function () {
		
		it ("data", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { });

			jrpc.onData(function(data) { done(); });
			jrpc.write('hello world!\r\n');

			jrpc.disconnect();
		});

		it ("End", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { });

			jrpc.onEnd(function(data) { done(); });

			jrpc.disconnect();
		});

		
		it ("close", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { });
			
			jrpc.onClose(function(data) { done(); });

			jrpc.disconnect();				
		});

		
		it ("error", function (done) {
			var jrpc = new JRPCBase("www.def.not.asti-usa.com", "80", function () { });

			jrpc.onError(function(data) { done(); });

			jrpc.disconnect();	
		});
		
		it ("timeout", function (done) {
			var jrpc = new JRPCBase("www.asti-usa.com", "80", function () { });

			jrpc.onTimeout(function(data) { done(); });
			jrpc.setTimeout(100);

			setTimeout(function () {
				jrpc.disconnect();	
			}, 300);		
		});
	});
});