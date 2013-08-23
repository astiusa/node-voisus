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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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

    it('should run a 1scenario by name', function(done) {
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
          scenarioURL = result.self;
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
          should.exist(result.items[0].data_type);
          should.exist(result.items[0].rev);
          should.exist(result.items[0].self);
          should.exist(result.items[0].editable);
          should.exist(result.items[0].name);
          should.exist(result.items[0].version);
          should.exist(result.items[0].id);
          should.exist(result.items[0].exercise);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put dis domains', function(done) {
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

    it('should post dis domains', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      var data = {name: "HAPI"};
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_postDisDomains()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.postDisDomains(scenarioURL, data, cb);
        },
        function(result, cb) {
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del dis domains', function(done) {
      var h = nVoisus.createHapi(test.host);
      var scenarioURL = "";
      var disDomain = "";
      var data = {name: "HAPI"};
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_delDisDomains()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.postDisDomains(scenarioURL, data, cb);
        },
        function(result, cb) {
          disDomain = result.self;
          h.scenarios.delDisDomains(disDomain, cb);
        },
        function(result, cb) {
          h.scenarios.getDisDomains(scenarioURL, cb);
        },
        function(result, cb) {
          for(var i = 0; i < result.items.length; i++) {
            result.items[i].name.should.not.eql(data.name);
          }
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
      var data = {udp_port: 3002};
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

    it.skip('should post dis', function(done) {
      var data = {udp_port: 3005};
      var scenarioURL = "";
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_postDis()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.postDis(scenarioURL, data, cb);
        },
        function(result, cb) {
          console.log(result);
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del dis', function(done) {
      var data = {udp_port: 3005};
      var scenarioURL = "";
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.scenarios.createScenario('test_postDis()', cb);
        },
        function(result, cb) {
          scenarioURL = result.self;
          h.scenarios.delDis(scenarioURL, data, cb);
        },
        function(result, cb) {
          h.scenarios.deleteScenario(scenarioURL, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

  });

  describe.skip('Services: ', function() {
    it('should get services', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result['ace-ae-hw']);
          should.exist(result['anzac']);
          should.exist(result['ace-radiomon-server']);
          should.exist(result['ace-cfimaster']);
          should.exist(result['ace-netmon']);
          should.exist(result['ace-ae-sw']);
          should.exist(result['ace-g-workload']);
          should.exist(result['ace-radio']);
          should.exist(result['ace-ae-construct']);
          should.exist(result['ace-rootd']);
          should.exist(result['ace-ae-loader']);
          should.exist(result['ace-creditd']);
          should.exist(result['simscribe']);
          should.exist(result['ace-operator']);
          should.exist(result['ace-ams-web']);
          should.exist(result['ace-ae']);
          should.exist(result['ace-rc']);
          should.exist(result['ace-construct']);
          should.exist(result['ace-hwdebug']);
          should.exist(result['ace-hapi']);
          should.exist(result['ace-hwrt']);
          should.exist(result['ace-credit-net']);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  
    it('should get ace-ae-hw', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceAeHw(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-ae-hw', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceAeHw(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-ae-hw', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceAeHw(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get anzac', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAnzac(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete anzac', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAnzac(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put anzac', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAnzac(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-radiomon-server', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceRadiomonServer(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-radiomon-server', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceRadiomonServer(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-radiomon-server', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceRadiomonServer(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-cfimaster', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceCfimaster(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-cfimaster', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceCfimaster(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-cfimaster', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceCfimaster(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-netmon', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceNetmon(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-netmon', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceNetmon(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-netmon', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceNetmon(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-ae-sw', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceAeSw(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-ae-sw', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceAeSw(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-ae-sw', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceAeSw(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-g-workload', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceGWorkload(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-g-workload', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceGWorkload(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-g-workload', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceGWorkload(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-radio', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceRadio(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-radio', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceRadio(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-radio', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceRadio(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-ae-construct', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceAeConstruct(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-ae-construct', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceAeConstruct(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-ae-construct', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceAeConstruct(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-rootd', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceRootD(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-rootd', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceRootD(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-rootd', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceRootD(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-ae-loader', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceAeLoader(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-ae-loader', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceAeLoader(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-ae-loader', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceAeLoader(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-creditd', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceCreditD(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-creditd', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceCreditD(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-creditd', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceCreditD(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get simscribe', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getSimscribe(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete simscribe', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delSimscribe(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put simscribe', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putSimscribe(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-operator', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceOperator(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-operator', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceOperator(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-operator', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceOperator(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-ams-web', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceAmsWeb(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-ams-web', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceAmsWeb(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-ams-web', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceAmsWeb(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-ae', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceAe(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-ae', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceAe(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-ae', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceAe(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-rc', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceRc(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-rc', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceRc(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-rc', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceRc(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });    

    it('should get ace-construct', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceContruct(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-construct', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceContruct(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-construct', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceContruct(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-hwdebug', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceHwDebug(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-hwdebug', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceHwDebug(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-hwdebug', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceHwDebug(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-hapi', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceHapi(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-hapi', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceHapi(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-hapi', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceHapi(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-hwrt', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceHwRt(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-hwrt', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceHwRt(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-hwrt', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceHwRt(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-credit-net', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.getAceCreditNet(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.status);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should delete ace-credit-net', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.delAceCreditNet(cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it.skip('should put ace-credit-net', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.services.putAceCreditNet(cb);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
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
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });
});
