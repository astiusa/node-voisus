# Services

In order to get information about services, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server services. 

---------------------------------------

### getServices(callback)

This function returns the services object of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `Services Object` (see [Services Object](#services-object))


# Services Object

In order to get inforation about the services, you must already have a services object (see [getServices](#getservicescallback)). These methods are available to interact with the the services.

---------------------------------------

for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
