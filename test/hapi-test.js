var should = require('should');
var hapi = require('../src/hapi');

var test = {
  host: "166.78.248.5",
  badHost: "www.def.not.asti-usa.museum",
};

describe('Voisus HAPI: ', function () {
  describe('Basic Functionality: ', function () {

    it ("should accept a host", function () {
      var h = new hapi(test.host);
      should.exist(h);
    });

    it ("should get the api version", function(done) {
      var h = new hapi(test.host);
      h.getAPIVersion(function(err, ver) {
        should.not.exist(err);
        should.exist(ver);
        ver.should.equal(1);
        done();
      });
    });

    it ('should get the server version', function(done) {
      var h = new hapi(test.host);
      h.getVersion(function(err, ver) {
        should.not.exist(err);
        should.exist(ver);
        should.exist(ver.product);
        ver.product.should.eql('Voisus Server');
        should.exist(ver.builddate);
        should.exist(ver.os_version);
        should.exist(ver.version);
        should.exist(ver.branch);
        should.exist(ver.time);
        should.exist(ver.release);
        should.exist(ver.commit);
        done();
      });
    });

  });

  describe('Performance: ', function() {
    it ("should get perfmon data", function(done) {
      var h = new hapi(test.host);
      h.getPerfmon(function(err, stats) {
        should.not.exist(err);
        should.exist(stats);
        should.exist(stats.stats);
        should.exist(stats.stats.memfree);
        should.exist(stats.stats.memtotal);
        should.exist(stats.stats.eth1);
        should.exist(stats.stats.swaptotal);
        should.exist(stats.stats.sample_time);
        should.exist(stats.stats.swapfree);
        should.exist(stats.stats.cpu0);
        should.exist(stats.stats.eth0);
        done();
      });
    });
  });
});