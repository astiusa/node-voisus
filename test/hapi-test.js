var async = require('async');
var should = require('should');
var nVoisus = require('.././lib/node-voisus');

var test = {
  host: process.env.SERVER || "10.26.3.109"
};

describe('Voisus HAPI: ', function () {

  describe('Basic: ', function () {
    it("should accept a host", function(done) {
      var h = nVoisus.createHapi(test.host);
      should.exist(h);
      done();
    });

    it("should get the api version", function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getApiVersion(cb);
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

    it('should get the voisus version', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getVersion(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.product);
          result.product.should.startWith('Voisus Server');
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
          //result.contact_phone1.should.eql('703-471-2104');
          should.exist(result.contact_email);
          //result.contact_email.should.eql('sales@asti-usa.com');
          should.exist(result.contact_name);
          //result.contact_name.should.eql('ASTi Sales');
          should.exist(result.description);
          //result.description.should.eql('HearVoisus Server');
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it("should get performance monitor", function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getPerfMon(cb);
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

    it('should get the run level', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getRunlevel(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.should.be.within(3,4); // 3 for HearVoisus, 4 for Production
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get the downloads', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getDownloads(cb);
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

    it('should get features', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getFeatures(cb);
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

  describe('Scenario: ', function() {
    it('should get scenarios', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getScenarios(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.length.should.be.above(0);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get templates', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getTemplates(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result[0]);
          result[0].length.should.be.above(1);
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
          h.createScenario('createScenario()', cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.scnId);
          should.exist(result.scnUrl);
          h.deleteScenario(result.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should create a scenario from a template', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getTemplates(cb);
        },
        function(result, cb) {
          h.createScenarioFromTemplate('createScenarioFromTemplate()', result[0], cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.scnId);
          should.exist(result.scnUrl);
          h.deleteScenario(result.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should run a scenario', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('runScenario()', cb);
        },
        function(result, cb) {
          scn = result;
          h.runScenario(result.scnId, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.scenario_id);
          should.exist(result.scenario_name);
          should.exist(result.session_id);
          should.exist(result.scenario_host);
          should.exist(result.install_state);
          h.deleteScenario(result.scenario_id, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should run an async scenario', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      var count = 0;
      async.waterfall([
        function(cb) {
          h.createScenario('runAsyncScenario()', cb);
        },
        function(result, cb) {
          scn = result;
          h.runAsyncScenario(result.scnId, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.install_state);
          result.install_state.should.eql('INSTALLING');
          async.whilst(
            function() {
              return count < 30;
            },
            function(callback) {
              count++;
              h.getRunningSession(function(err, data) {
                if(data.install_state === "INSTALLING" && data.install_status[0] > 1) {
                  count += 30;
                }
              });
              setTimeout(callback, 500);
            }, function(err) {
              should.not.exist(err);
              h.deleteScenario(scn.scnId, cb);
            }
          );
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should stop a scenario', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('stopScenario()', cb);
        },
        function(result, cb) {
          scn = result;
          h.runScenario(scn.scnId, cb);
        },
        function(result, cb) {
          h.stopScenario(result.scenario_id, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.install_state.should.eql('UNINSTALLED');
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should delete a scenario', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('deleteScenario()', cb);
        },
        function(result, cb) {
          scn = result;
          h.deleteScenario(scn.scnId, cb);
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

    it('should get dis domains', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getDisDomains()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getDisDomains(cb);
        },
        function(result, cb) {
          should.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put dis domains', function(done) {
      var scn, dDomId;
      var data = {name: "HAPI"};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('putDisDomains()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getDisDomains(cb);
        },
        function(result, cb) {
          dDomId = result[0].id;
          scn.putDisDomains(dDomId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post dis domains', function(done) {
      var scn;
      var data = {name: "HAPI"};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postDisDomains()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postDisDomains(data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del dis domains', function(done) {
      var scn, dDomId;
      var data = {name: "HAPI"};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('delDisDomains()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postDisDomains(data, cb);
        },
        function(result, cb) {
          dDomId = result.id;
          scn.getDisDomains(cb);
        },
        function(result, cb) {
          scn.delDisDomains(dDomId, cb);
        },
        function(result, cb) {
          scn.getDisDomains(cb);
        },
        function(result, cb) {
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get dis', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getDis()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getDis(cb);
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
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put dis', function(done) {
      var scn;
      var data = {udp_port: 3002};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('putDis()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.putDis(data, cb);
        },
        function(result, cb) {
          scn.getDis(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.udp_port.should.eql(3002);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del dis', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('delDis()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.delDis(cb);
        },
        function(result, cb) {
          should.not.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get nets', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getNets()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getNets(cb);
        },
        function(result, cb) {
          should.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put nets', function(done) {
      var scn, netId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('putNets()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postNets(data, cb);
        },
        function(result, cb) {
          netId = result.id;
          data = {name: 'UNHAPI'};
          scn.putNets(netId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql('UNHAPI');
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post nets', function(done) {
      var scn;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postNets()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postNets(data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del nets', function(done) {
      var scn, netId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('delNets()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postNets(data, cb);
        },
        function(result, cb) {
          netId = result.id;
          scn.delNets(netId, cb);
        },
        function(result, cb) {
          should.not.exist(result);
          scn.getNets(cb);
        },
        function(result, cb) {
          result.length.should.eql(0);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get roles', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getRoles()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getRoles(cb);
        },
        function(result, cb) {
          should.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put roles', function(done) {
      var scn, roleId;
      var data = {name: 'HAPI', chat_enabled: false};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('putRoles()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          roleId = result.id;
          data.name = 'UNHAPI';
          scn.putRoles(roleId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post roles', function(done) {
      var scn;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postRoles()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del roles', function(done) {
      var scn, roleId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('delRoles()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          roleId = result.id;
          scn.delRoles(roleId, cb);
        },
        function(result, cb) {
          should.not.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get roles generic radio', function(done) {
      var scn, roleId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getRolesGenericRadio()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          roleId = result.id;
          scn.postRolesGenericRadio(roleId, data, cb);
        },
        function(result, cb) {
          scn.getRolesGenericRadio(roleId, cb);
        },
        function(result, cb) {
          should.exist(result);
          result[0].name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post roles generic radio', function(done) {
      var scn, roleId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getRolesGenericRadio()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          roleId = result.id;
          scn.postRolesGenericRadio(roleId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get roles comm panel template', function(done) {
      var scn, roleId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getRolesCommpanel()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          roleId = result.id;
          scn.postRolesCommpanel(roleId, data, cb);
        },
        function(result, cb) {
          scn.getRolesCommpanel(roleId, cb);
        },
        function(result, cb) {
          should.exist(result);
          result[0].name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post roles comm panel template', function(done) {
      var scn, roleId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postRolesCommpanel()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postRoles(data, cb);
        },
        function(result, cb) {
          roleId = result.id;
          scn.postRolesCommpanel(roleId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get fills', function(done) {
      var scn, fillId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getFills()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postFills(data, cb);
        },
        function(result, cb) {
          fillId = result.id;
          scn.getFills(cb);
        },
        function(result, cb) {
          should.exist(result);
          result[0].name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put fills', function(done) {
      var scn, fillId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('putFills()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postFills(data, cb);
        },
        function(result, cb) {
          fillId = result.id;
          data.name = 'UNHAPI';
          scn.putFills(fillId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql('UNHAPI');
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post fills', function(done) {
      var scn;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postFills()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postFills(data, cb);
        },
        function(result, cb) {
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del fills', function(done) {
      var scn, fillId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('delFills()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postFills(data, cb);
        },
        function(result, cb) {
          fillId = result.id;
          scn.delFills(fillId, cb);
        },
        function(result, cb) {
          should.not.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get waveforms', function(done) {
      var scn, waveformId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getWaveforms()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postWaveforms(data, cb);
        },
        function(result, cb) {
          waveformId = result.id;
          scn.getWaveforms(cb);
        },
        function(result, cb) {
          should.exist(result);
          result[0].name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should put waveforms', function(done) {
      var scn, waveformId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('putWaveforms()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postWaveforms(data, cb);
        },
        function(result, cb) {
          waveformId = result.id;
          data.name = 'UNHAPI';
          scn.putWaveforms(waveformId, data, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.name.should.eql('UNHAPI');
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post waveforms', function(done) {
      var scn;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postWaveforms()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postWaveforms(data, cb);
        },
        function(result, cb) {
          result.name.should.eql(data.name);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should del waveforms', function(done) {
      var scn, waveformId;
      var data = {name: 'HAPI'};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('delWaveforms()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postWaveforms(data, cb);
        },
        function(result, cb) {
          waveformId = result.id;
          scn.delWaveforms(waveformId, cb);
        },
        function(result, cb) {
          should.not.exist(result);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

  });

  describe('Performance Tool: ', function() {
    it('should get performance test', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getPerformanceTest()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getPerformanceTest(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.data_type);
          result.data_type.should.eql('performance_test');
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get performance test report', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getPerformanceTestReports()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getPerformanceTestReports(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.items);
          h.deleteScenario(scn.scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('Services: ', function() {
    it('should create services', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get ace-ae-hw', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeHw(cb);
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

    it('should get anzac', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAnzac(cb);
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

    it('should get ace-radiomon-server', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRadiomonServer(cb);
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

    it('should get ace-cfimaster', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceCfimaster(cb);
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

    it('should get ace-ams-web', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAmsWeb(cb);
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

    it('should get ace-audio-web', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAudioWeb(cb);
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

    it('should get ace-ae-sw', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeSw(cb);
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

    it('should get ace-g-workload', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceGWorkload(cb);
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

    it('should get ace-radio', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRadio(cb);
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

    it('should get ace-ae-construct', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeConstruct(cb);
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

    it('should get ace-rootd', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRootd(cb);
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

    it('should get ace-ae-loader', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeLoader(cb);
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

    it('should get ace-creditd', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceCreditd(cb);
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

    it('should get simscribe', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getSimscribe(cb);
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

    it('should get ace-operator', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceOperator(cb);
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

    it('should get ace-sapi', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceSapi(cb);
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

    it('should get ace-netmon', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceNetmon(cb);
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

    it('should get ace-ae', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAe(cb);
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

    it('should get ace-rc', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRc(cb);
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

    it('should get ace-construct', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceConstruct(cb);
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

    it('should get ace-hapi-rc', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHapiRc(cb);
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

    it('should get ace-hwdebug', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHwdebug(cb);
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

    it('should get ace-hapi', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHapi(cb);
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

    it('should get ace-hwrt', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHwrt(cb);
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

    it('should get ace-credit-net', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceCreditNet(cb);
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

  });

  describe('Session: ', function() {
    it('should get running sessions', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getRunningSession(cb);
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
    it('should get cloud id', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getCloudId(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.self.cloud_id);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('User: ', function() {
    var user = {
        user: 'TestUser',
        pass: 'TestPass'
    };

    it('should get all AMS users', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getUsers(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result[0]);
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post an AMS user', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.postUser(user, cb);
        },
        function(result, cb) {
          should.exist(result);
          h.deleteUserByName(user.user, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should delete an AMS user by name', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.postUser(user, cb);
        },
        function(result, cb) {
          h.deleteUserByName(user.user, cb);
        },
        function(result, cb) {
          should.not.exist(result);
          cb(null);
        }
      ], done);
    });

    it('should delete an AMS user by id', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.postUser(user, cb);
        },
        function(result, cb) {
          h.deleteUserById(result.id, cb);
        },
        function(result, cb) {
          should.not.exist(result);
          cb(null);
        }
      ], done);
    });
  });
});
