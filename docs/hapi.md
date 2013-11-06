# Hapi

Hapi is the object used to interact with the voisus server. It allows you to get information about the server, scenarios, sessions, and users.

## Creating a Hapi object

To create a hapi object, you must require voisus package `require('voisus')` and then call the `createHapi()` method with the server IP address. Once you have a hapi object you can then begin calling its methods in the form of `hapi."method"()`. 

### createHapi(IPAddress)

__Arguments__

* IPAddress: `String`

```javascript
192.30.252.131
```

__Returns__

* `Hapi Object` (see [Hapi Object](#hapi-object))

---------------------------------------

# Hapi Object

the following methods are called with the hapi object.

example: 

```javascript
var nVoisus = require('voisus');
var hapi = nVoisus.createHapi('IPAddress');
hapi."method"(args, function(err, result) {
  ...
});
```

---------------------------------------

### getApiVersion(callback)

This function gets the API version for the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `String`: 

```javascript
"1"
```

---------------------------------------

### getVersion(callback)

This function gets the software Version Info. Get general information about when the system was built, what branch, release etc.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`: 

```javascript
"product": "Voisus Server International",
"manifest_checksum": "https://URL/api/version/checksum",
"ia_version": "none",
"builddate": "2013/10/30 07:26pm EST",
"os_version": "CentOS release 6.4 (Final)",
"version": "v5.15.0-518-g53fb19f8",
"branch": "master",
"time": "1383172490",
"release": "v5.Dev : 53fb19f8 : (master)",
"commit": "53fb19f8dbcfbf5abb651d4fdf43dd787a6ffc6a"
```

---------------------------------------

### getAboutMe(callback)

This function gets the contact information and description for this system.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`: 

```javascript
"description": "",
"_rev": "1-ad740481efe40ac6f3aec9d058f43a89",
"contact_phone1": "",
"contact_email": "",
"contact_name": "",
"_id": "1b240a3ee5b1d0a3a0b11428e2000ab3",
"id": "aboutme"
```

---------------------------------------

### getPerfMon(callback)

This function gets the current statistics for memory, network, and cpu.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`: 

```javascript
"eth0": [
    1042953,
    12617,
    0,
    0,
    0,
    0,
    0,
    0,
    15726335,
    12714,
    0,
    0,
    0,
    0,
    0,
    0
  ],
"eth1": [Array],
"memfree": 788980,
"memtotal": 1914328,
"swaptotal": 0,
"sample_time": 1383593860.897985,
"swapfree": 0,
"cpu0": [
  18540,
  10,
  37544
],
"cpu1": [Array],
```

---------------------------------------

### getRunlevel(callback)

This function gets the runlevel.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `String`: 

```javascript
"3"
```

---------------------------------------

### getDownloads(callback)

This function gets the links to available voisus client files for download.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`: 

```javascript
"linux_client": {
  "path": "/var/asti/downloads/voisus-client-v5.Dev.bin",
  "link": "https://URL/api/downloads/linux_client/",
  "name": "voisus-client-v5.Dev.bin",
  "size": "12.19 MB"
},
"linux_opengl": {JSON},
"windows_app": {JSON},
"windows_client": {JSON},
"vbs2_plugin": {JSON},
"windows_opengl": {JSON},
"windows_tocnet": {JSON}
```

---------------------------------------

### getServers(callback)

This function gets the list of current ASTi servers on the network.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`: 

```javascript
"[]"
```

---------------------------------------

### getFeatures(callback)

This function gets the list of all features.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`: 

```javascript
{ 
  "acenet": {enabled: 'no'},
  "prc117f": {enabled: 'no'},
  "debugwebsocket": {enabled: 'yes'},
  "networkcredits": {enabled: 'no'},
  "crewintercom": {enabled: 'no'},
  "urc200": {enabled: 'yes'},
  "sincgars": {enabled: 'no'},
  "simscribeallpdus": {enabled: 'no'},
  "multiserver": {enabled: 'yes'},
  "acexmpp": {enabled: 'no'},
  "webaudio": {enabled: 'yes'},
  "radiomonautotune": {enabled: 'yes'},
  "es3d": {enabled: 'yes'},
  "simscribevbs": {enabled: 'yes'},
  "tocnetcau": {enabled: 'no'},
  "disreplay": {enabled: 'no'},
  "streamapi": {enabled: 'yes'},
  "acechat": {enabled: 'no'},
  "prc119": {enabled: 'yes'},
  "dis": {enabled: 'no'}
}
```

for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
