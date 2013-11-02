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
    "id": "id",
    "name": "name",
    "data_type": "data_type"
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
  "id": "id",
  "name": "name",
  "session": "session",
  "host": "host",
  "state": "state"
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
  "id": "id",
  "name": "name",
  "session": "session",
  "host": "host",
  "state": "state"
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
  "state": "state"
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
    "name": "name",
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
