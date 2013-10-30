## Sessions

In order to get information about sessions, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server sessions.

---------------------------------------

### getRunningSession(callback)

This function returns the running session of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`:
```javascript
"id": "id",
"name": "name",
"session": "session",
"host": "host",
"state": "state",
"percent": "percent"
```

[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
