# Hapi

Hapi is the object used to interact with the voisus server. It allows you to get information about the server, scenarios, sessions, and users.

## Creating a Hapi object

To create a hapi object, you must require voisus package `require('voisus')` and then call the `createHapi()` method with the server IP address. Once you have a hapi object you can then begin calling its methods in the form of `hapi."method"()`. 

### createHapi(IPAddress)

__Arguments__

* IPAddress: 'string'

```javascript
192.30.252.131
```

__Returns__

* `Hapi Object`

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

This function returns the API version for the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `String`: 

```javascript
"API version"
```

---------------------------------------

### getVersion(callback)

This function returns the software Version Info. Get general information about when the system was built, what branch, release etc.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```javascript
"product": "product", 
"manifest_checksum": "manifest_checksum", 
"ia_version": "ia_version", 
"builddate": "builddate", 
"self": "self", 
"os_version": "os_version", 
"version": "version", 
"branch": "branch", 
"time": "time", 
"release": "release", 
"commit": "commit"
```

---------------------------------------

### getAboutMe(callback)

This function returns the contact information and description for this system.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```javascript
"description": "description", 
"_rev": "_rev", 
"contact_phone1": "contact_phone1", 
"self": "self", 
"contact_email": "contact_email", 
"contact_name": "contact_name", 
"_id": "_id", 
"id": "id"
```

---------------------------------------

### getPerfmon(callback)

This function returns the current statistics for memory, network, and cpu.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```javascript
"eth0": [array],
"eth1": [array],
"memfree": "memfree",
"memtotal": "memtotal",
"swaptotal": "swaptotal",
"sample_time": "sample_time",
"swapfree": "swapfree",
"cpu0": [array],
"cpu1": [array],
```

---------------------------------------

### getRunlevel(callback)

This function returns the runlevel. Not very useful.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `string`: 

```javascript
"runlevel"
```

---------------------------------------

### getDownloadURLs(callback)

This function returns the links to available voisus client files for download.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```javascript
"linux_opengl": {JSON}, 
"windows_app": {JSON}, 
"linux_client": {JSON}, 
"windows_client": {JSON}, 
"vbs2_plugin": {JSON}, 
"windows_opengl": {JSON}, 
"windows_tocnet": {JSON}
```

---------------------------------------

### getServers(callback)

This function returns the list of current ASTi servers on the network.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `array`: 

```javascript
"[]"
```

---------------------------------------

### getFeatures(callback)

This function returns the list of all features.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```javascript
"acenet": "acenet",
"prc117f": "prc117f",
"debugwebsocket": "debugwebsocket",
"networkcredits": "networkcredits",
"crewintercom": "crewintercom",
"urc200": "urc200",
"sincgars": "sincgars",
"simscribeallpdus": "simscribeallpdus",
"multiserver": "multiserver",
"acexmpp": "acexmpp",
"radiomonautotune": "radiomonautotune",
"simscribevbs": "simscribevbs",
"disreplay": "disreplay",
"tocnetcau": "tocnetcau",
"acechat": "acechat",
"prc119": "prc119"
```
