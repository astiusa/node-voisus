# Users

In order to get information about users, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server users.

---------------------------------------

### getUsers(callback)

This function gets the current users of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
[
  {
    "user": "fakeuser",
    "pass": "6ab86a9550ed702e65eb73030f37ded9ed43254d6fa6258250485418657333876ca399e724567f58bdda6fcc195d011f365aa8dfe22c67ddaea6b56cddede78c",
    "data_type": "ams_user"
  },
  ...
]
```

---------------------------------------

### postUsers(user, callback)

This function creates the users in the voisus server.

__Arguments__

* user: `JSON`

```javascript
{
  "user": "fakeuser",
  "pass": "fakepassword"
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
"user": "fakeuser",
"pass": "6ab86a9550ed702e65eb73030f37ded9ed43254d6fa6258250485418657333876ca399e724567f58bdda6fcc195d011f365aa8dfe22c67ddaea6b56cddede78c",
"data_type": "ams_user"
```

[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
