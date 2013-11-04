# Sessions

In order to get information about sessions, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server sessions.

---------------------------------------

### getRunningSession(callback)

This function gets the running session of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
"id": "e673f38989514ccda3bf0ffc82083f17",
"name": "Basic_Example",
"session": "ddecf123a6c14f89a8c40740fbc0e038",
"host": "admin-nvoisus.local",
"state": "INSTALLED",
"percent": 100
```

[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
