var async = require('async');
var should = require('should');
var nVoisus = require('.././lib/node-voisus');

var test = {
  host: "ServerAddress",
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

    it('should get the server version', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getVersion(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.product);
          result.product.should.eql('Voisus Server International');
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
  });

  describe('Download cleints: ', function() {
    it('should get the download clients url', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getDownloadURLs(cb);
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

  describe.skip('Client Mon: ', function() {
    it('should get the number of clients', function(done) {
      done();
    });
  });

  describe.skip('Radio Mon: ', function() {
    it('should get the number of radios', function(done) {
      done();
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
          should.exist(result[0].name);
          should.exist(result[0].data_type);
          result.length.should.be.above(1);
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
          should.exist(result._scnId);
          should.exist(result._scnUrl);
          h.deleteScenario(result._scnId, cb);
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
          h.createScenarioFromTemplate('createScenarioFromTemplate()', result[0].name, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result._scnId);
          should.exist(result._scnUrl);
          h.deleteScenario(result._scnId, cb);
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
          h.runScenario(result._scnId, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.id);
          should.exist(result.name);
          should.exist(result.session);
          should.exist(result.host);
          should.exist(result.state);
          h.deleteScenario(result.id, cb);
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
          h.runAsyncScenario(result._scnId, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.state);
          result.state.should.eql('INSTALLING');
          async.whilst(
            function() {
              return count < 30;
            },
            function(callback) {
              count++;
              h.getRunningSession(function(err, data) {
                if(data.state === "INSTALLING" && data.percent > 1) {
                  count += 30;
                }
              });
              setTimeout(callback, 500);
            }, function(err) {
              should.not.exist(err);
              h.deleteScenario(scn._scnId, cb);
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
          h.runScenario(scn._scnId, cb);
        },
        function(result, cb) {
          h.stopScenario(result.id, cb);
        },
        function(result, cb) {
          should.exist(result);
          result.state.should.eql('UNINSTALLED');
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    //FIXME
    it.skip('should post dis', function(done) {
      var scn;
      var data = {udp_port: 3005};
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('postDis()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.postDis(data, cb);
        },
        function(result, cb) {
          scn.getDis(cb);
        },
        function(result, cb) {
          console.log(result);
          h.deleteScenario(scn._scnId, cb);
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
          should.exist(result);
          result.name.should.eql('delete');
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          scn.getNets(cb);
        },
        function(result, cb) {
          result.length.should.eql(0);
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          should.exist(result);
          h.deleteScenario(scn._scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get generic radio', function(done) {
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
          scn.getRolesGenericRadio(roleId,cb);
        },
        function(result, cb) {
          h.deleteScenario(scn._scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should get fills', function(done) {
      var scn;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.createScenario('getFills()', cb);
        },
        function(result, cb) {
          scn = result;
          scn.getFills(cb);
        },
        function(result, cb) {
          should.exist(result);
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          h.deleteScenario(scn._scnId, cb);
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
          should.exist(result);
          h.deleteScenario(scn._scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

  });

  describe('Services GET: ', function() {
    it('should get services', function(done) {
      var srvc;
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getServices(cb);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeHw(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAnzac(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRadiomonServer(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceCfimaster(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceNetmon(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeSw(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceGWorkload(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRadio(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeConstruct(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRootd(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAeLoader(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceCreditd(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getSimscribe(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceOperator(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAmsWeb(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceAe(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceRc(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceConstruct(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHwdebug(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHapi(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceHwrt(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(false);
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
          h.getServices(cb);
        },
        function(result, cb) {
          should.exist(result);
          srvc = result;
          srvc.getAceCreditNet(cb);
        },
        function(result, cb) {
          should.exist(result);
          result.status.should.eql(true);
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
          should.exist(result.state);
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

  describe('Features: ', function() {
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

  describe('Cloud: ', function() {
    it('should get cloud id', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getCloudId(cb);
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

  describe('User: ', function() {
    it('should get all AMS users', function(done) {
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.getUsers(cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result[0].data_type);
          result[0].data_type.should.eql('ams_user');
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should post an AMS user', function(done) {
      var user = {
        user: 'TestUser',
        pass: 'TestPass'
      };
      var h = nVoisus.createHapi(test.host);
      async.waterfall([
        function(cb) {
          h.postUser(user, cb);
        },
        function(result, cb) {
          should.exist(result);
          should.exist(result.data_type);
          result.data_type.should.eql('ams_user');
          cb(null);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe.only('Performance Tool: ', function() {
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
          h.deleteScenario(scn._scnId, cb);
        }
      ], function(err) {
        should.not.exist(err);
        done();
      });
    });

  });
});
