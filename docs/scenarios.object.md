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