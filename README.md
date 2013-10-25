# Node Voisus

This module provides access to maintenance and oversight over the voisus client and server. 
# Hapi
- [Basic](#basic)
- [Scenarios](#scenarios)
- [Users](#users)
- [Sessions](#sessions)
- [Services](#services)

## Installation:

npm install voisus

## Usage:
```javascript
var nVoisus = require('voisus');
```

* createHapi(IPAddress[string], cb); returns: Hapi Object

```javascript
var hapi = nVoisus.createHapi('IPAddress');
```

## Basic
```javascript
hapi."method"(function(err, result) {...});
```

* getApiVersion(cb); returns: JSON
* getVersion(cb); returns: JSON
* getAboutMe(cb); returns: JSON
* getPerfmon(cb); returns: JSON
* getRunlevel(cb); returns: JSON
* getDownloadURLs(cb); returns: JSON
* getServers(cb); returns: JSON
* getFeatures(cb); returns: JSON

## Scenarios
```javascript
var hapi = nVoisus.createHapi('IPAddress');
hapi.createScenario('scenarioExample', function(err, scenario) {...});
```

* createScenario(Scenario Name[string], cb); returns: Scenario Object
* getScenarios(cb); returns: array[] scenarios
* runScenario(Scenario ID[string], cb); returns: JSON
* runAsyncScenario(Scenario ID[string], cb); returns: JSON
* stopScenario(Scenario ID[string], cb); returns: JSON
* deleteScenario(Scenario ID[string], cb); returns: JSON
* getTemplates(cb); returns: array[] Templates
* createScenarioFromTemplate(Scenario Name[string], Template, cb)

### Scenario Object
```javascript
var hapi = nVoisus.createHapi('IPAddress');
hapi.createScenario('scenarioExample', function(err, scenario) {
	var myScenario = scenario;
	myScenario."method"(function(err, result) {...});
});
```

* getDisDomains(cb); returns: array[] Dis Domains
* putDisDomains(Dis Domain ID[string], Dis Domain Object[JSON], cb); returns: JSON
* postDisDomains(Dis Domain Object[JSON], cb); returns: JSON
* delDisDomains(Dis Domain ID[string], cb); returns: JSON
* getDis(cb); returns: JSON
* putDis(Dis Object[JSON], cb); returns: JSON
* delDis(cb ); returns: JSON
* getNets(); returns: array[] Nets
* putNets(Net ID[string], Net Object[JSON], cb); returns: JSON
* postNets(Net Object[JSON], cb); returns: JSON
* delNets(Net ID[string], cb); returns: JSON
* getRoles(cb); returns: array[] Roles
* putRoles(Role ID[string], Roles Object[JSON], cb); returns: JSON
* postRoles(Roles Object[JSON], cb); returns: JSON
* delRoles(Role ID[string], cb); returns: JSON
* getRolesGenericRadio(Role ID[string], cb); returns: JSON
* getFills(cb); returns: array[] Fills
* putFills(Fills ID[stirng], Fills Object[JSON], cb); returns: JSON
* postFills(Fills Object[JSON], cb); returns: JSON
* delFills(Fills ID[stirng], cb); returns: JSON

## Users

* getUsers(cb); returns: array[] Users
* postUsers(User Object[JSON], cb); returns: JSON

## Sessions

* getRunningSession(cb); returns: JSON

## Services

* getServices(cb); returns: Services Object

### Services Object

