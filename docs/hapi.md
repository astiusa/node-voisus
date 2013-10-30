# Hapi

## Creating a Hapi object

```javascript
var nVoisus = require('voisus');
var hapi = nVoisus.createHapi('IPAddress');
```


### getApiVersion(callback)

This function returns the API version for the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `String`: 

"API version"


### getVersion(callback)

This function returns the software Version Info. Get general information about when the system was built, what branch, release etc.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```json
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

### getAboutMe(callback)

This function returns the contact information and description for this system.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```json
"description": "description", 
"_rev": "_rev", 
"contact_phone1": "contact_phone1", 
"self": "self", 
"contact_email": "contact_email", 
"contact_name": "contact_name", 
"_id": "_id", 
"id": "id"
```

### getPerfmon(callback)

This function returns the current statistics for memory, network, and cpu.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```json
"eth0": `array`,
"eth1": `array`,
"memfree": "memfree",
"memtotal": "memtotal",
"swaptotal": "swaptotal",
"sample_time": "sample_time",
"swapfree": "swapfree",
"cpu0": `array`,
"cpu1": `array`,
```

### getRunlevel(callback)

This function returns the runlevel. Not very useful.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `string`: 

"runlevel"


### getDownloadURLs(callback)

This function returns the links to available voisus client files for download.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```json
"linux_opengl": `JSON`, 
"windows_app": `JSON`, 
"linux_client": `JSON`, 
"windows_client": `JSON`, 
"vbs2_plugin": `JSON`, 
"windows_opengl": `JSON`, 
"windows_tocnet": `JSON`
```


### getServers(callback)

This function returns the list of current ASTi servers on the network.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `array`: 

"[]"


### getFeatures(callback)

This function returns the list of all features.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`: 

```json
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

