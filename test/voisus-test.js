var should = require('should');
var voisus = require('../src/voisus');

describe('JRPC Object Components: ', function() {
	it("Should have accept a method as an argument.", function()
	{
		var tmpV = voisus.JRPCObj("testMethod");		
		tmpV.method.should.equal("testMethod");
		
		var tmpV = voisus.JRPCObj("testMethod2");		
		tmpV.method.should.equal("testMethod2");
	});

	it("Should have an empty params set and id should be null by default.", function()
	{
		var tmpV = voisus.JRPCObj("testMethod");		

		Object.keys(tmpV.params).length.should.equal(0);
		should.not.exist(tmpV.id);
	});

	it("Should have the ability to pass parameters in as second argument.", function()
	{
		var tmpV = voisus.JRPCObj("testMethod", {test1: 1, test2: 2});		

		Object.keys(tmpV.params).length.should.equal(2);

		should.exist(tmpV.params.test1);
		tmpV.params.test1.should.equal(1);

		should.exist(tmpV.params.test2);
		tmpV.params.test2.should.equal(2);

		should.not.exist(tmpV.id);
	});

	it("Should have the ability to pass new id in as third argument.", function()
	{
		var tmpV = voisus.JRPCObj("testMethod", {});	
		
		should.not.exist(tmpV.id);

		tmpV = voisus.JRPCObj("testMethod", {}, 42);
		
		should.exist(tmpV.id);	
		tmpV.id.should.equal(42);		
	});

	it("Should provide means of converting object to string.", function()
	{
		var tmpV = voisus.JRPCObj("testMethod");	

		voisus.JRPCString(tmpV).should.equal('{"jsonrpc":"2.0","id":null,"method":"testMethod","params":{}}\0');
	});

	it("Should always have trailing \0 on generated json strings.", function()
	{
		var tmpV = voisus.JRPCObj("testMethod");	

		var str = voisus.JRPCString(tmpV);

		str[str.length - 1].should.equal("\0");
	});
});

describe('Voisus Commands: ', function() {
	it("Should provide Ping", function (done)
	{
		voisus.Connect("10.26.0.117", "51234", function() {
			voisus.Data(function (data) { console.log(data); });
			voisus.Commands.ping(0, function () {							
				done();				
			});
		});		
	});

	it("Should provide Connect", function (done)
	{
		voisus.Connect("10.26.0.117", "51234", function() {
			voisus.Data(function (data) { console.log(data); });
			voisus.Commands.connect("10.26.4.111", 0, function () {	
				done();				
			});
		});		
	});
});