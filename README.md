# Node Voisus

This module provides access to maintenance and oversight over the voisus client and server. 
# Hapi
- [Basic](#basic)
- [Scenarios](#scenarios)

## Usage:
```javascript
var nVoisus = require('.././lib/node-voisus');
```

#### createHapi();
`params:` IPAddress

`returns:`	Hapi object
```javascript
var hapi = nVoisus.createHapi('IPAddress');
```

## Basic
`params:` None

`returns:`	JSON
```javascript
hapi.`method`(function(err, result) {...});
```
getApiVersion(callback)
getVersion(callback)
getAboutMe(callback)
getPerfmon(callback)
getRunlevel(callback)
getDownloadURLs(callback)

## Scenarios

#### createScenario();
`params:`	Scenario Name (string)

`returns:`	Scenario object
```javascript
var hapi = nVoisus.createHapi('IPAddress');
hapi.createScenario('MyNewScenario', function(err, result) {...});
```

#### getScenarios();
`params:`	None

`returns:`	Array of scenarios

#### runScenario();
`params:`	Scenario ID (string)

`returns:`	JSON

#### runAsyncScenario
`params:`	Scenario ID (string)

`returns:`	JSON

#### stopScenario();
`params:`	Scenario ID (string)

`returns:`	JSON

#### deleteScenario();
`params:`	Scenario ID (string)

`returns:`	JSON

### Scenario object
```javascript
var hapi = nVoisus.createHapi('IPAddress');
hapi.createScenario('MyNewScenario', function(err, result) {
	var scenario = result;
	scenario.`method`(function(err, result) {...});
});
```
#### getDisDomains();
`params:`	None

`returns:`	Array of Dis Domains

#### putDisDomains();
`params:`	Dis Domain ID (string), Data (JSON Object)

`returns:`	Array of Dis Domains

#### postDisDomains();
`params:`	Data (JSON Object)

`returns:`	JSON

#### delDisDomains();
`params:`	Dis Domain ID (string)

`returns:`	JSON

