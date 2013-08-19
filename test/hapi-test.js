var async = require('async');
var should = require('should');
var nVoisus = require('.././lib/node-voisus');

var test = {
  host: "10.26.4.113",
  badHost: "www.def.not.asti-usa.museum",
};

describe('Voisus HAPI: ', function () {
  describe('Basic Functionality: ', function () {

    it("should accept a host", function () {
      var h = nVoisus.createHapi(test.host);
      should.exist(h);
    });

    it("should get the api version", function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getAPIVersion(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.should.equal(1);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get the server version', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getVersion(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.product);
          result.product.should.eql('Voisus Server');
          should.exist(result.builddate);
          should.exist(result.os_version);
          should.exist(result.version);
          should.exist(result.branch);
          should.exist(result.time);
          should.exist(result.release);
          should.exist(result.commit);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get info aboutme', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getAboutMe(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.id);
          result.id.should.equal('aboutme');
          should.exist(result.contact_phone1);
          result.contact_phone1.should.eql('703-471-2104');
          should.exist(result.contact_email);
          result.contact_email.should.eql('sales@asti-usa.com');
          should.exist(result.contact_name);
          result.contact_name.should.eql('ASTi Sales');
          should.exist(result.description);
          result.description.should.eql('HearVoisus Server');
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('Performance: ', function() {
    it("should get perfmon data", function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getPerfmon(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.memfree);
          should.exist(result.memtotal);
          //should.exist(result.eth1);
          should.exist(result.swaptotal);
          should.exist(result.sample_time);
          should.exist(result.swapfree);
          should.exist(result.cpu0);
          should.exist(result.eth0);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('System Power: ', function() {
    it('should get the run level', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getRunlevel(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.should.eql('3');
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    // reboot is broken, never returns data
    it.skip('should reboot the box', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.reboot(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });
  describe.skip('Client Mon: ', function() {
    it('should get the number of clients', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getNumClients(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.should.eql(1);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe.skip('Radio Mon: ', function() {
    it('should get the number of radios', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getNumRadios(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.should.eql(5);
          //console.log(result[0]);
          //console.log(JSON.parse(result[0]));
          //result.should.eql(4);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('Scenario: ', function() {
    it('should get all the scenarios', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.getScenarios(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.templates);
          should.exist(result.items);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should create a scenario', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_createScenario()', cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.deleteScenario(result.self, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get scenario by name', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_getScenarioByName()', cb);
        },
        function(result, cb) {
          h.scenarios.getScenarioByName('test_getScenarioByName()', cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.deleteScenario(result, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should run a scenario by name', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_runScenarioByName()', cb);
        },
        function(result, cb) {
          should.exist(result);
          scenarioURL = result.self;
          h.scenarios.runScenarioByName('test_runScenarioByName()', cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should run a scenario', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_runScenario()', cb);
        },
        function(result, cb) {
          should.exist(result);
          scenarioURL = result.self
          h.scenarios.runScenario(result.self, cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should run an async scenario', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      var count = 0;
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_runAsyncScenario()', cb);
        },
        function(result, cb) {
          should.exist(result);
          scenarioURL =  result.self;
          h.scenarios.runAsyncScenario(result.self, cb);
        },
        function(result, cb) {
          should.exist(result);
          async.whilst(
            function() {
              return count < 30;
            },
            function(callback) {
              count++;
              h.sessions.getRunningSession(function(err, data) {
                if(data.install_state === "INSTALLING" && data.install_status[0] > 1) {
                  count += 30;
                }
              });
              setTimeout(callback, 500);
            }, function(err) {
              should.not.exist(err);
              h.scenarios.deleteScenario(scenarioURL, cb);
            }
          );
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should stop a scenario', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_stopScenario()', cb);
        },
        function(result, cb) {
          should.exist(result);
          scenarioURL = result.self;
          h.scenarios.runScenario(result.self, cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.stopScenario(result.self, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.install_state.should.eql('UNINSTALLED');
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should delete a scenario', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_deleteScenario()', cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.deleteScenario(result.self, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get dis domains', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_getDisDomains()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.getDisDomains(scenarioURL, cb);
        },
        function(result, cb) {
          should.exist(result);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post dis domains', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      var data = {name: "HAPI"};
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_putDisDomains()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.putDisDomains(scenarioURL, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get dis', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_getDis()', cb);
        },
        function(result, cb) {
          scenarioURL =  result.self;
          h.scenarios.getDis(scenarioURL, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.dis_moving_threshold);
          should.exist(result.rev);
          should.exist(result.pdu_signal);
          should.exist(result.dis_timeout_moving);
          should.exist(result.mcast_addr);
          should.exist(result.id);
          should.exist(result.description);
          should.exist(result.pdu_rx);
          //should.exist(result.parent);
          should.exist(result.self);
          should.exist(result.pdu_entity_mcast_addr);
          should.exist(result.ip_mode);
          should.exist(result.pdu_tx_mcast_addr);
          should.exist(result.dis_app_id);
          should.exist(result.version);
          should.exist(result.ucast_addr);
          should.exist(result.pdu_tx);
          should.exist(result.pdu_signal_mcast_addr);
          should.exist(result.dis_site_id);
          should.exist(result.mcast_addr_start);
          should.exist(result.network_modulations);
          should.exist(result.data_type);
          should.exist(result.setup_type);
          should.exist(result.udp_port);
          should.exist(result.dis_timeout_normal);
          should.exist(result.pdu_entity);
          should.exist(result.domain_exid_map);
          should.exist(result.dis_id_mode);
          should.exist(result.pdu_rx_mcast_addr);
          should.exist(result.name);
          should.exist(result.dis_version);
          should.exist(result.radio_tx_period);
          should.exist(result.radio_holdoff);
          should.exist(result.eth);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put dis', function(done) {
      var data = {
        udp_port: 3002
      };
      var scenarioURL = "";
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_putDis()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.putDis(scenarioURL, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.udp_port.should.eql(3002);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('Session: ', function() {
    it('should get sessions', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.sessions.getSessions(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.items);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get running sessions', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.sessions.getRunningSession(cb);
        },
        function(result, cb) {
          should.exist(result);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('Server: ', function() {
    it('should get servers', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getServers(cb);
        },
        function(result, cb) {
          should.exist(result);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('SOS: ', function() {
    it('should generate an SOS report', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.generateSOS(cb);
        },
        function(result, cb) {
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('Cloud: ', function() {
    it('should get current cloud', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.cloud.getCurrentCloud(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.all);
          should.exist(result.self);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get cloudId', function(done) {
      var cloudId = "10_26_5_16";
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.cloud.getCloudId(cloudId, cb);
        },
        function(result, cb) {
          should.exist(result);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should change cloudId', function(done) {
      var cloudId = "10_26_5_166";
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.cloud.setCloudId(cloudId, cb);
        },
        function(result, cb) {
          should.exist(result);
          h.cloud.getCurrentCloudId(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.should.eql(cloudId);
          cb();
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });
});
