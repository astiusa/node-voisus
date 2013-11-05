# Services

In order to get information about services, you must already have a hapi object (see [hapi][docs_hapi]). These methods are available to interact with the voisus server services. 

---------------------------------------

### createServices(callback)

This function returns the services object of the voisus server.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Returns__

* `Services Object` (see [Services Object](#services-object))


# Services Object

In order to get inforation about the services, you must already have a services object (see [createServices](#createservicescallback)). These methods are available to interact with the the services.

---------------------------------------

### getAceAeHw(callback)
### getAnzac(callback)
### getAceRadiomonServer(callback)
### getAceCfimaster(callback)
### getAceAmsWeb(callback)
### getAceAudioWeb(callback)
### getAceAeSw(callback)
### getAceGWorkload(callback)
### getAceRadio(callback)
### getAceAeConstruct(callback)
### getAceRootd(callback)
### getAceAeLoader(callback)
### getAceCreditd(callback)
### getSimscribe(callback)
### getAceOperator(callback)
### getAceSapi(callback)
### getAceNetmon(callback)
### getAceAe(callback)
### getAceRc(callback)
### getAceConstruct(callback)
### getAceHapiRc(callback)
### getAceHwdebug(callback)
### getAceHapi(callback)
### getAceHwrt(callback)
### getAceCreditNet(callback)

The followins function gets the status of of their respective service.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
{
  "status": false
}
```

---------------------------------------

### putAceAeHw(callback)
### putAnzac(callback)
### putAceRadiomonServer(callback)
### putAceCfimaster(callback)
### putAceAmsWeb(callback)
### putAceAudioWeb(callback)
### putAceAeSw(callback)
### putAceGWorkload(callback)
### putAceRadio(callback)
### putAceAeConstruct(callback)
### putAceRootd(callback)
### putAceAeLoader(callback)
### putAceCreditd(callback)
### putSimscribe(callback)
### putAceOperator(callback)
### putAceSapi(callback)
### putAceNetmon(callback)
### putAceAe(callback)
### putAceRc(callback)
### putAceConstruct(callback)
### putAceHapiRc(callback)
### putAceHwdebug(callback)
### putAceHapi(callback)
### putAceHwrt(callback)
### putAceCreditNet(callback)

The followins function restarts the respective service. __Use with caution__.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
{
  "status": false
}
```

---------------------------------------

### delAceAeHw(callback)
### delAnzac(callback)
### delAceRadiomonServer(callback)
### delAceCfimaster(callback)
### delAceAmsWeb(callback)
### delAceAudioWeb(callback)
### delAceAeSw(callback)
### delAceGWorkload(callback)
### delAceRadio(callback)
### delAceAeConstruct(callback)
### delAceRootd(callback)
### delAceAeLoader(callback)
### delAceCreditd(callback)
### delSimscribe(callback)
### delAceOperator(callback)
### delAceSapi(callback)
### delAceNetmon(callback)
### delAceAe(callback)
### delAceRc(callback)
### delAceConstruct(callback)
### delAceHapiRc(callback)
### delAceHwdebug(callback)
### delAceHapi(callback)
### delAceHwrt(callback)
### delAceCreditNet(callback)

The followins function stops the respective service. __Use with caution__.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `Array`:

```javascript
{
  "status": false
}
```

---------------------------------------
for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
