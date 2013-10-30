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