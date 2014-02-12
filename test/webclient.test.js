var async = require('async');
var should = require('should');
var nVoisus = require('.././lib/node-voisus');

var test = {
  host: "162.242.237.235"
};

describe('Voisus WebClient: ', function () {

  var vc;
  
  afterEach(function(done) {
    if (vc) {
      vc.removeAllListeners();
      vc.on('disconnected', done);
      vc.disconnect();
    }
    done();
  });
  
  describe('Constructor', function () {
    beforeEach(function() {
      vc = nVoisus.createWebClient({host: test.host, debug: false});
    });
    
    it("should accept a host", function() {
      should.exist(vc);
      vc.host.should.eql(test.host);
    });
    
    it("should emit ready", function(done) {
      vc.on(vc.EVENTS.ready, function() {
        done();
      });
    });
  });
  
  describe('api.disconnect', function() {
    
    beforeEach(function(done) {
      vc = nVoisus.createWebClient({host: test.host, debug: false});
      vc.on(vc.EVENTS.error, function(err) {
        should.not.exit(err);
      });
      vc.on(vc.EVENTS.ready, done);
    });
    
    it("should emit disconnected", function(done) {
      vc.on(vc.EVENTS.disconnect, function() {
        done();
      });
      vc.disconnect();
      
    });
  });
  
  describe('api.connect', function() {
    
    beforeEach(function(done) {
      vc = nVoisus.createWebClient({host: test.host, debug: false});
      vc.on(vc.EVENTS.ready, function() {
        done();
      });
    });
    
    it("should accept a client name", function(done) {
      vc.on(vc.EVENTS.error, function(err) {
        should.not.exist(err);
      });
      vc.connect('testName');
      done();
    });
    
    it("should emit connect", function(done) {
      vc.on(vc.EVENTS.connect, function() {
        done();
      });
      vc.connect('testName2');
    });
    
    it("should get a list of roles", function(done) {
      vc.on(vc.EVENTS.roles, function(roles) {
        should.exist(roles);
        done();
      });
      vc.connect('testName2');
    });
  });
  
  describe('api.setRole', function() {
    
    var roles;
    
    beforeEach(function(done) {
      vc = nVoisus.createWebClient({host: test.host, debug: false});
      vc.on(vc.EVENTS.ready, function() {
        vc.connect('testName');
      });
      vc.on(vc.EVENTS.roles, function(r) {
        roles = r;
        done();
      });
    });
    
    it("should set a tmpRole value", function() {
      vc.setRole(roles[0]);
      should.exist(vc.tmpRole);
      vc.tmpRole.should.eql(roles[0]);
    });
    
    it("should emit role_set", function(done) {
      vc.setRole(roles[0]);
      vc.on(vc.EVENTS.role_set, function(role) {
        should.exist(role);
        role.should.eql(roles[0]);
        done();
      });
    });
  });
});
