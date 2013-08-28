# Node Voisus

This module provides access to maintenance and oversight over the voisus client and server. 
# Hapi
- [Usage](#usage)
- [Scenarios](#scenarios)

## Usage:
```javascript
var nVoisus = require('.././lib/node-voisus');
```

#### createHapi();
`params:`	IPAddress
`returns:`	Hapi object
```javascript
var hapi = nVoisus.createHapi('IPAddress');
```

### getAPIVersion(cb);
`params:`	callback
`returns:`	cb(err, string) API version
```javascript
hapi.getAPIVersion(function(err, result) {...});
```

### getVersion(cb);
`params:`	callback
`returns:`	cb(err, obj) server version information
```javascript
hapi.getVersion(function(err, result) {...});
```

## Basic

## Scenarios
