# Users

In order to get information about users, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server users.

---------------------------------------

### getUsers(callback)

This function returns the current users of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`:

```javascript
"user": "user",
"pass": "pass",
"data_type": "data_type"
```

---------------------------------------

### postUsers(user, callback)

This function returns the current users of the voisus server.

__Arguments__

* user: `JSON`

```javascript
"user": "user",
"pass": "pass"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `JSON`:

```javascript
"user": "user",
"pass": "pass",
"data_type": "data_type"
```

[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
