## Scenarios

In order to get information about scenarios, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server scenarios.

---------------------------------------

### createScenario(scenarioName, callback)

This function returns a scenario object. (see [Scenario Object][])

__Arguments__

* scenarioName: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `Scenario Object` (see [Scenario Object][])


---------------------------------------

### getScenarios(callback)

This function gets the scenarios of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "id": "e673f38989514ccda3bf0ffc82083f17",
    "name": "Basic_Example",
    "data_type": "scenario"
  },
  ...
]
```


---------------------------------------

### runScenario(scenarioId, callback)

This function runs the scenario.

__Arguments__

* scenarioId: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "id": "e673f38989514ccda3bf0ffc82083f17",
  "name": "Basic_Example",
  "session": "ddecf123a6c14f89a8c40740fbc0e038",
  "host": "admin-nvoisus.local",
  "state": "INSTALLED"
}
```


---------------------------------------

### runAsyncScenario(scenarioId, callback)

This function runs the scenario asynchronously.

__Arguments__

* scenarioId: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "id": "e673f38989514ccda3bf0ffc82083f17",
  "name": "Basic_Example",
  "session": "ddecf123a6c14f89a8c40740fbc0e038",
  "host": "admin-nvoisus.local",
  "state": "INSTALLED"
}
```


---------------------------------------

### stopScenario(scenarioId, callback)

This function stops the scenario.

__Arguments__

* scenarioId: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "state": "UNINSTALLED"
}
```


---------------------------------------

### deleteScenario(scenarioId, callback)

This function deletes the scenario.

__Arguments__

* scenarioId: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{}
```

---------------------------------------

### getTemplates(scenarioId, callback)

This function gets scenario templates.

__Arguments__

* scenarioId: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "name": "Basic_Example",
    "data_type": "template"
  },
  ...
]
```


---------------------------------------

### createScenarioFromTemplate(scenarioId, callback)

This function creates a scenario object from an existing scenario.

__Arguments__

* scenarioId: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Scenario Object` (see [Scenario Object][])


# Scenario Object
