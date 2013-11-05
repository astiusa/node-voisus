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
{
  "install_status": [ 100, 'install finished' ],
  "cloud_id": 'vbs3',
  "scenario_id": 'e673f38989514ccda3bf0ffc82083f17',
  "session_id": '2370085eb18d44bf9932625bd660aeec',
  "session_errors": [],
  "install_state": 'INSTALLED',
  "scenario_name": 'Basic_Example',
  "scenario_host": 'admin-nvoisus.local'
}
```

for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
