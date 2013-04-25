var should = require('should');
var vc = require('../src/voisusclient');

var test = {
	host: "www.gneu.org", 
	badHost: "www.def.not.asti-usa.museum", 
	port: 80,
	clientPC: "10.26.0.117", 
	clientPort: "51234",
	serverPC: "10.26.4.111", 
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

				client.ping(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);

					response.jsonrpc.should.equal('2.0');
					response.result.should.equal('pong');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it("disconnect", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.disconnect(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);

					response.jsonrpc.should.equal('2.0');
					response.result.should.equal('ok');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it("connect", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.connect(test.serverPC, function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);

					response.jsonrpc.should.equal('2.0');
					response.result.should.equal('ok');

					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_versions", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_versions(function (response) {
					
					(typeof(response)).should.equal("object");

					should.exist(response.id);

					response.jsonrpc.should.equal('2.0');
					
					should.exist(response.result.Client);
					(typeof(response.result.Client)).should.equal("object");

					should.exist(response.result.Client.BuildTimestamp);
					should.exist(response.result.Client.BuildVersion);
					should.exist(response.result.Client.MsgDate);
					should.exist(response.result.Client.MsgVersion);

					should.exist(response.result.Server);
					(typeof(response.result.Server)).should.equal("object");

					should.exist(response.result.Server.BuildTimestamp);
					should.exist(response.result.Server.BuildVersion);
					should.exist(response.result.Server.MsgDate);
					should.exist(response.result.Server.MsgVersion);
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_world_pos", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_world_pos(0,0,0, function (response) {
					
					(typeof(response)).should.equal("object");

					should.exist(response.id);

					response.jsonrpc.should.equal('2.0');
					response.result.should.equal('ok');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_test_mode", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_test_mode(0, function (response) {
					
					(typeof(response)).should.equal("object");

					should.exist(response.id);

					response.jsonrpc.should.equal('2.0');
					response.result.should.equal('ok');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_operators", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_operators(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.not.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_assets", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_assets(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.not.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_connection", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_connection(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");
					
					should.exist(response.result.authorized);
					should.exist(response.result.network_connected);
					should.exist(response.result.connect_state);
					should.exist(response.result.role_connected);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_client_name", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_client_name(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");
					
					should.exist(response.result.name);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_curr_role", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_curr_role(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");
					
					should.exist(response.result.name);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_asset_nets", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_asset_nets(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("start_analyzer", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.start_analyzer(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					response.result.should.equal('ok');

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_analyzer_results", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_analyzer_results(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("stop_analyzer", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.stop_analyzer(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					response.result.should.equal("ok");
					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_network_settings", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_asset_nets(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_headset_settings", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_headset_settings(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_roles", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_roles(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_vehicles", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_vehicles(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.not.exist(response.result);
					
					(typeof(response.result)).should.equal("object");

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("get_transmitting", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.get_transmitting(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
										
					response.result.should.equal(false);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("autotune_radio", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.autotune_radio("1", 1, function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
										
					response.result.should.equal('ok');

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_radiomon", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_radiomon(1, function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
										
					response.result.should.equal('ok');

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_vehicle", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_vehicle("44", function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);
										
					response.result.should.equal('ok');

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_ptt", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_ptt(1, function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_role", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_role("testid", function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_client_name", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_client_name("new name", function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it ("set_client_name", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_client_name("new name", function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it("set_asset", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.set_asset(4, 2, function (response) {	

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
			it("keep_alive", function (done) {
				var client = new vc(test.clientPC, test.clientPort);

				client.keep_alive(function (response) {

					(typeof(response)).should.equal("object");

					should.exist(response.id);
					should.exist(response.result);

					response.jsonrpc.should.equal('2.0');
					
					done()
				});

				setTimeout(function () {
					client.Disconnect();	
				}, 300);		
			});
		});
	});	
});