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
    pass: '6a386a9550ed702e65eb73040f27ded9ed43254d6fa6258250485418657333878ca399e724567f58bdda6fcc195d011f565aa8dfe22c67ddaea6b56cddede7ec',
    user: 'voisusUser',
    id: 'a159bb2cb9cc4a778866b07169d09b1b'
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
  "user": "voisusUser",
  "pass": "voisusPassword"
}
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  id: 'a159bb2cb9cc4a778866b07169d09b1b',
  user: 'voisusUser',
  pass: '6a386a9550ed702e65eb73040f27ded9ed43254d6fa6258250485418657333878ca399e724567f58bdda6fcc195d011f565aa8dfe22c67ddaea6b56cddede7ec' }
}
```

---------------------------------------

### deleteUserByName(userName, callback)

This function creates the users in the voisus server.

__Arguments__

* userName: `String`

```javascript
"voisusUser"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

---------------------------------------

### deleteUserById(userId, callback)

This function creates the users in the voisus server.

__Arguments__

* userId: `String`

```javascript
"a159bb2cb9cc4a778866b07169d09b1b"
```

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Null`:

```javascript
null
```

for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
