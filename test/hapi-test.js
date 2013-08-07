var should = require('should');
var hapi = require('../src/hapi');

var test = {
  //host: "166.78.248.5",
  host: "10.26.4.113",
  badHost: "www.def.not.asti-usa.museum",
};

describe('Voisus HAPI: ', function () {
  describe('Basic Functionality: ', function () {

    it("should accept a host", function () {
      var h = new hapi(test.host);
      should.exist(h);
    });

    it("should get the api version", function(done) {
      var h = new hapi(test.host);
      h.getAPIVersion(function(err, ver) {
        should.not.exist(err);
        should.exist(ver);
        ver.should.equal(1);
        done();
      });
    });

    it('should get the server version', function(done) {
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

    it('should get info aboutme', function(done) {
      var h = new hapi(test.host);
      h.getAboutMe(function(err, about) {
        should.not.exist(err);
        should.exist(about);
        should.exist(about.id);
        about.id.should.equal('aboutme');
        should.exist(about.contact_phone1);
        about.contact_phone1.should.eql('703-471-2104');
        should.exist(about.contact_email);
        about.contact_email.should.eql('sales@asti-usa.com');
        should.exist(about.contact_name);
        about.contact_name.should.eql('ASTi Sales');
        should.exist(about.description);
        about.description.should.eql('HearVoisus Server');
        done();
      });
    });
  });

  describe('Performance: ', function() {
    it("should get perfmon data", function(done) {
      var h = new hapi(test.host);
      h.getPerfmon(function(err, stats) {
        should.not.exist(err);
        should.exist(stats);
        should.exist(stats.memfree);
        should.exist(stats.memtotal);
        //should.exist(stats.eth1);
        should.exist(stats.swaptotal);
        should.exist(stats.sample_time);
        should.exist(stats.swapfree);
        should.exist(stats.cpu0);
        should.exist(stats.eth0);
        done();
      });
    });
  });

  describe('System Power: ', function() {
    it('should get the run level', function(done) {
      var h = new hapi(test.host);
      h.getRunlevel(function(err, runlevel) {
        should.not.exist(err);
        should.exist(runlevel);
        runlevel.should.eql('3');
        done();
      });
    });

    // reboot is broken, never returns data
    it.skip('should reboot the box', function(done) {
      var h = new hapi(test.host);
      h.reboot(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });
  describe('Client Mon: ', function() {
    it('should get the number of clients', function(done) {
      var h = new hapi(test.host);
      h.getNumClients(function(err, numclients) {
        should.not.exist(err);
        should.exist(numclients);
        numclients.should.eql(1);
        done();
      });
    });
  });

  describe('Radio Mon: ', function() {
    it('should get the number of radios', function(done) {
      var h = new hapi(test.host);
      h.getNumRadios(function(err, numradios) {
        should.not.exist(err);
        should.exist(numradios);
        numradios.should.eql(5);
        //onsole.log(numradios[0]);
        //console.log(JSON.parse(numradios[0]));
        //numradios.should.eql(4);
        done();
      });
    });
  });

  describe('Scenario: ', function() {
    it('should get all the scenarios', function(done) {
      var h = new hapi(test.host);
      h.getScenarios(function(err, scenarios) {
        should.not.exist(err);
        should.exist(scenarios);
        should.exist(scenarios.templates);
        should.exist(scenarios.items);
        done();
      });
    });

    it('should create a scenario', function(done) {
      var h = new hapi(test.host);
      h.createScenario('test_createScenario()', function(err, result) {
        should.not.exist(err);
        should.exist(result);
        done();
      });
    });

    it('should get scenario by name', function(done) {
      var h = new hapi(test.host);
      h.getScenarioByName('test_createScenario()', function(err, scenario) {
        should.not.exist(err);
        should.exist(scenario);
        done();
      });
    });

    it('should run a scenario', function(done) {
      var h = new hapi(test.host);
      h.createScenario('test_runScenario()', function(err, result) {
        should.not.exist(err);
        should.exist(result);
        h.runScenario('test_runScenario()', function(err, result) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should stop a scenario', function(done) {
      var h = new hapi(test.host);
      h.getRunningSession(function(err, result) {
        should.not.exist(err);
        should.exist(result);
        result.scenario_name.should.eql('test_runScenario()');
        h.stopScenario(result.self, function(err, result) {
          should.not.exist(err);
          should.exist(result);
          result.install_state.should.eql('UNINSTALLED');
          done();
        });
      });
    });

    it('should delete a scenario', function(done) {
      var h = new hapi(test.host);
      h.getScenarioByName('test_createScenario()', function(err, scenario) {
        should.not.exist(err);
        should.exist(scenario);
        h.deleteScenario(scenario, function(err, result) {
          should.not.exist(err);
          done();
        });
      });
    });

  });

  describe('Session: ', function() {
    it('should get sessions', function(done) {
      var h = new hapi(test.host);
      h.getSessions(function(err, result) {
        should.not.exist(err);
        should.exist(result);
        done();
      });
    });
  });
});
