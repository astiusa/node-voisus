## Scenarios

In order to get information about scenarios, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server scenarios.

---------------------------------------

### createScenario(scenarioName, callback)

This function returns a scenario object. (see [Scenario Object](#scenario-object))

__Arguments__

* scenarioName: `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `Scenario Object` (see [Scenario Object](#scenario-object))

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

* [scenarioId](#scenarioid-objscnid-string): `String`

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

* [scenarioId](#scenarioid-objscnid-string): `String`

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

* [scenarioId](#scenarioid-objscnid-string): `String`

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

* [scenarioId](#scenarioid-objscnid-string): `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{}
```

---------------------------------------

### getTemplates(scenarioId, callback)

This function gets the scenario templates from the voisus server.

__Arguments__

* [scenarioId](#scenarioid-objscnid-string): `String`

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

* [scenarioId](#scenarioid-objscnid-string): `String`

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Scenario Object` (see [Scenario Object](#scenario-object))

---------------------------------------

# Scenario Object

In order to perform actions on a given scenarios, you must already have a scenario object (see [Create Scenario](#createscenarioscenarioname-callback)). These methods are available to interact with the the scenario. 

Contains:

##### scenarioId (obj.scnId): `String`

```javascript
"573c9a1b6346475894b0f3f341e82907"
```

---------------------------------------

### getDisDomains(callback)

This function gets the dis domains of the scenario.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "data_type": 'dis_domains',
    "rev": '1-1345161e69ce495c12368a2a6f93a924',
    "editable": false,
    "name": 'default_domain',
    "version": 'v5.15.0-518-g53fb19f8',
    "id": 'e99157c13ea04571912e60cdfbd8c0ba',
    "exercise": 1,
    "description": ''
  },
  ...
]
```

---------------------------------------

### putDisDomains(dDomId, dDomObj, callback)

This function updates a dis domain.

__Arguments__

* dDomId: `String`

```javascript
"32777a46fddf41eb9b654f2ede349c0a"
```

* dDomObj: `JSON`

```javascript
{
  "name": "HAPI"
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "data_type": 'dis_domains',
  "rev": '2-24a3c10c832848aba730d0e36568e73d',
  "editable": false,
  "name": 'HAPI',
  "version": 'v5.15.0-518-g53fb19f8',
  "id": '32777a46fddf41eb9b654f2ede349c0a',
  "exercise": 1,
  "description": ''
}
```

---------------------------------------

### postDisDomains(dDomObj, callback)

This function creates a new dis domain.

__Arguments__

* dDomObj: `JSON`

```javascript
{
  "name": "HAPI"
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "data_type": 'dis_domains',
  "rev": '1-eeea44bc7c84224f67ac00889ee9f84f',
  "editable": true,
  "name": 'HAPI',
  "version": 'v5.15.0-518-g53fb19f8',
  "id": '433df52113254dbf933598082a79e6de',
  "exercise": 0,
  "description": ''
}
```

---------------------------------------

### delDisDomains(dDomId, callback)

This function deletes a dis domain.

__Arguments__

* dDomId: `String`

```javascript
"433df52113254dbf933598082a79e6de"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

---------------------------------------

### getDis(callback)

This function gets the dis of the scenario.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "dis_moving_threshold": 500,
  "rev": '1-c45e21fd8430d7cd5e037063999125cf',
  "pdu_signal": 'broadcast',
  "dis_timeout_moving": 2,
  "mcast_addr": '',
  "id": 'dis',
  "description": '',
  "pdu_rx": 'broadcast',
  "parent": null,
  "pdu_entity_mcast_addr": '',
  "ip_mode": 'broadcast',
  "pdu_tx_mcast_addr": '',
  "dis_app_id": 0,
  "version": 'v5.15.0-518-g53fb19f8',
  "ucast_addr": '',
  "pdu_tx": 'broadcast',
  "pdu_signal_mcast_addr": '',
  "dis_site_id": 0,
  "mcast_addr_start": '',
  "network_modulations": {},
  "data_type": 'dis',
  "setup_type": 'basic',
  "udp_port": 3000,
  "dis_timeout_normal": 5,
  "pdu_entity": 'broadcast',
  "domain_exid_map": {},
  "dis_id_mode": 'derived',
  "pdu_rx_mcast_addr": '',
  "name": '',
  "dis_version": 6,
  "radio_tx_period": 20,
  "radio_holdoff": 24,
  "eth": 'eth0'
}
```

---------------------------------------

### putDis(dObj, callback)

This function updates the dis.

__Arguments__

* dObj: 'JSON'

```javascript
{
  "udp_port": 3002
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "dis_moving_threshold": 500,
  "rev": '2-d072e90f3c2d0ab5ca65743009a4299a',
  "pdu_signal": 'broadcast',
  "dis_timeout_moving": 2,
  "mcast_addr": '',
  "id": 'dis',
  "description": '',
  "pdu_rx": 'broadcast',
  "pdu_entity_mcast_addr": '',
  "ip_mode": 'broadcast',
  "pdu_tx_mcast_addr": '',
  "dis_app_id": 0,
  "version": 'v5.15.0-518-g53fb19f8',
  "ucast_addr": '',
  "pdu_tx": 'broadcast',
  "pdu_signal_mcast_addr": '',
  "dis_site_id": 0,
  "mcast_addr_start": '',
  "network_modulations": {},
  "data_type": 'dis',
  "setup_type": 'basic',
  "udp_port": 3002,
  "dis_timeout_normal": 5,
  "pdu_entity": 'broadcast',
  "domain_exid_map": {},
  "dis_id_mode": 'derived',
  "pdu_rx_mcast_addr": '',
  "name": '',
  "dis_version": 6,
  "radio_tx_period": 20,
  "radio_holdoff": 24,
  "eth": 'eth0'
}
```

---------------------------------------

### delDis(callback)

This function deletes the dis.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

---------------------------------------

### getNets(callback)

This function gets the nets of the scenario.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "txfrequency": 0,
    "rev": "1-3fc0c0d64f6815caef50e56bfd13930f",
    "crypto": null,
    "name": "Recon",
    "data_type": "nets",
    "waveform": "https://162.209.98.219/api/scenarios/8b995cf8585c4ea49f4d3de0aa642a05/waveforms/b07a711fb2d348098d7a544b6b84bee2/",
    "frequency": 214050000,
    "satcom": null,
    "version": "v5.9.0-292-g875bb23c",
    "freqhop": null,
    "id": "d4771081d2584779b6e1fd6fb2d0f2e0",
    "description": ""
  },
  ...
]
```

---------------------------------------

### putNets(netId, netObj, callback)

This function updates a net.

__Arguments__

* netID: `String`

```javascript
"d4771081d2584779b6e1fd6fb2d0f2e0"
```

* netObj: `JSON`

```javascript
{
  "name": 'UNHAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "txfrequency": 0,
  "rev": '2-35715d1f21149a2fbe0f1360d1e53bef',
  "crypto": null,
  "name": 'UNHAPI',
  "data_type": 'nets',
  "waveform": null,
  "frequency": 0,
  "satcom": null,
  "version": 'v5.15.0-518-g53fb19f8',
  "freqhop": null,
  "id": 'd3b340ebecb046c5882cf9706f1e0882',
  "description": ''
}
```

---------------------------------------

### postNets(netObj, callback)

This function creates a net.

__Arguments__

* netObj: `JSON`

```javascript
{
  "name": 'HAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "txfrequency": 0,
  "rev": '1-6dd782fc6b44676ec2dc52b06ac54e82',
  "crypto": null,
  "name": 'HAPI',
  "data_type": 'nets',
  "waveform": null,
  "frequency": 0,
  "satcom": null,
  "version": 'v5.15.0-518-g53fb19f8',
  "freqhop": null,
  "id": 'b1ae95e7c2f3444f90553cee79143b78',
  "description": ''
}
```

---------------------------------------

### delNets(netId, callback)

This function deletes a net.

__Arguments__

* netId: `String`

```javascript
"b1ae95e7c2f3444f90553cee79143b78"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

---------------------------------------

### getRoles(callback)

This function gets the roles of the scenario.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "description": '',
    "data_type": 'roles',
    "rev": '2-69471f394e52837b7c7033dc2ef4853f',
    "id": '59868c1b66ac497fb081cad598426c31',
    "version": 'v5.15.0-518-g53fb19f8',
    "shared": false,
    "autotune_enabled": false,
    "name": 'UNHAPI',
    "radiohw": 0,
    "calling_enabled": true,
    "chat_enabled": false
  },
  ...
]
```

---------------------------------------

### putRoles(roleId, roleObj, callback)

This function updates a role.

__Arguments__

* roleId: `String`

```javascript
"59868c1b66ac497fb081cad598426c31"
```

* roleObj: `JSON`

```javascript
{
  "name": 'UNHAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "description": '',
  "data_type": 'roles',
  "rev": '2-69471f394e52837b7c7033dc2ef4853f',
  "id": '59868c1b66ac497fb081cad598426c31',
  "version": 'v5.15.0-518-g53fb19f8',
  "shared": false,
  "autotune_enabled": false,
  "name": 'UNHAPI',
  "radiohw": 0,
  "calling_enabled": true,
  "chat_enabled": false
}
```

---------------------------------------

### postRoles(roleObj, callback)

This function creates a new role.

__Arguments__

* roleObj: `JSON`

```javascript
{
  "name": 'HAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  description: '',
  data_type: 'roles',
  rev: '1-b3e37ae656be3222ca3db8bc60078d2c',
  id: 'cfca635af1214d258788debce4abf088',
  version: 'v5.15.0-518-g53fb19f8',
  shared: false,
  autotune_enabled: false,
  name: 'HAPI',
  radiohw: 0,
  calling_enabled: true,
  chat_enabled: false
}
```

---------------------------------------

### delRoles(roleId, callback)

This function deletes a role.

__Arguments__

* roleId: `String`

```javascript
"59868c1b66ac497fb081cad598426c31"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

---------------------------------------

### getRolesGenericRadio(roleId, callback)

This function gets the generic radios of the role.

__Arguments__

* roleId: `String`

```javascript
"59868c1b66ac497fb081cad598426c31"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "name": "Generic_radio-3",
    "shared": false,
    "rev": "1-795e72fef8041ec36c6e01818196d503",
    "data_type": "generic_radio",
    "version": "v5.8.0-567-gbee9459c",
    "default_fill": null,
    "net_lock": false,
    "sqtail_disabled": false,
    "id": "173a1435ace54804bedd58180ff739c8",
    "cipher_enabled": true,
    "description": ""
  },
  ...
]
```

---------------------------------------

### postRolesGenericRadio(roleId, radioObj, rcallback)

This function creates a generic radios in the role.

__Arguments__

* roleId: `String`

```javascript
"59868c1b66ac497fb081cad598426c31"
```

* radioObj: `JSON`

```javascript
{
  "name": 'HAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "name": 'HAPI',
  "shared": false,
  "rev": '1-5be09d5ed816937f65672bd912797ee9',
  "data_type": 'generic_radio',
  "version": 'v5.15.0-518-g53fb19f8',
  "default_fill": null,
  "net_lock": false,
  "sqtail_disabled": false,
  "id": 'a9fae710d3a84cb6a71c3b51d05bb4bc',
  "cipher_enabled": true,
  "description": ''
}
```

---------------------------------------

### getFills(callback)

This function gets the fills of the scenario.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "single_net_container": false,
    "data_type": 'fills',
    "description": '',
    "rev": '1-7165deb8e08597a13acd8041a4b7826c',
    "version": 'v5.15.0-518-g53fb19f8',
    "id": '4d15207ebfdd46b78393190768f97e45',
    "name": 'HAPI'
  },
  ...
]
```

---------------------------------------

### putFills(fillId, fillObj, callback)

This function updates a fill.

__Arguments__

* fillId: `String`

```javascript
"4d15207ebfdd46b78393190768f97e45"
```

* fillObj: `JSON`

```javascript
{
  "name": 'UNHAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
{
  "single_net_container": false,
  "data_type": 'fills',
  "description": '',
  "rev": '2-32babf9ae0f30b68109b4d6295052e2d',
  "version": 'v5.15.0-518-g53fb19f8',
  "id": '40f64b7c43d04e3daf9885a90aaf3742',
  "name": 'UNHAPI'
}
```

---------------------------------------

### postFills(fillObj, callback)

This function creates a fill.

__Arguments__

* fillObj: `JSON`

```javascript
{
  "name": 'HAPI'
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
{
  "single_net_container": false,
  "data_type": 'fills',
  "description": '',
  "rev": '1-7165deb8e08597a13acd8041a4b7826c',
  "version": 'v5.15.0-518-g53fb19f8',
  "id": '6abe0ea97c1e4f25b1964f7916bd143b',
  "name": 'HAPI'
}
```

---------------------------------------

### delFills(fillId, callback)

This function deletes a fill.

__Arguments__

* fillId: `String`

```javascript
"4d15207ebfdd46b78393190768f97e45"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

---------------------------------------

for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
