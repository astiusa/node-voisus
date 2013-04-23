var should = require('should');
var vc = require('../src/voisusclient');

var test = {
	host: "www.gneu.org", 
	badHost: "www.def.not.asti-usa.museum", 
	port: 80,
	clientPC: "10.26.0.117", 
	clientPort: "51234"
}

describe('Voisus Client: ', function () {
	describe('Basic Functionality: ', function () {
		
		it ("should accept a host and port, and connect on creation and the callback should be executed upon connection.", function (done) {
			var client = new vc(test.host, test.port, function () { done(); });

			client.Disconnect();
		});

		
		it ("Should trigger event on disconnect", function (done) {
			var client = new vc(test.host, test.port);

			client.onEnd(function(data) { done(); });

			client.Disconnect();
		});

		it ("Allow sending messages", function (done) {
			var client = new vc(test.host, test.port);

			client.Send('hello world!\r\n', function (data) { done(); } );

			client.Disconnect();
		});
	});
	
	describe('Events: ', function () {

		describe ("Event Subscription: ", function () {
			
			it ("data", function (done) {
				var client = new vc(test.host, test.port);

				client.onData(function(data) { done(); });

				client.Send('hello world!\r\n', function (data) { done(); } );

				client.Disconnect();
			});
			
			it ("end", function (done) {
				var client = new vc(test.host, test.port);

				client.onEnd(function(data) { done(); });

				client.Disconnect();
			});

			it ("close", function (done) {
				var client = new vc(test.host, test.port);
				
				client.onClose(function(data) { done(); });

				client.Disconnect();				
			});
			
			it ("error", function (done) {
				var client = new vc(test.badHost, test.port);

				client.onError(function(data) { done(); });

				client.Disconnect();	
			});
			
			it ("timeout", function (done) {
				var client = new vc(test.host, test.port);

				client.onTimeout(function(data) { done(); });
				client.SetTimeout(100);

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
		});
	});

	describe('Windows PC Connection: ', function () {
		
		it ("Should establish connection.", function (done) {
			var client = new vc(test.clientPC, test.clientPort, function () { done(); });

			client.Disconnect();
		});

		describe('Commands: ', function () {
			it ("ping", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.ping(function (data) {done()});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
		});
	});	
});