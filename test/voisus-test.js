var should = require('should');
var vc = require('../src/voisusclient');

var test = {
	host: "10.26.0.117", 
	port: 51234
}

describe.skip('Voisus Client: ', function () {
	it("Should connect at initialization, and provide disconnect", function (done) {

		var client = new vc(test.host, test.port, function () {
			client.onDisconnect(function (data) { done(); });
			client.onResponse(function (data) {console.log(data.toString());});
			
			client.ping(function (data) { console.log(data.toString());});

			client.Disconnect();
		})
	});
});

describe.skip('Voisus Commands: ', function() {
	it("Should provide Ping", function (done)
	{
		voisus.Connect(test.host, test.port, function() {		
			voisus.commands.ping(0, function () {		
				done();				
			});
		});		
	});

	it("Should provide Connect", function (done)
	{
		voisus.Connect(test.host, test.port, function() {			
			voisus.commands.connect("10.26.4.111", 0, function () {	
				done();				
			});
		});		
	});
});