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

The following functions all have the same behavior.

__getAceAeHw(callback)__
__getAnzac(callback)__
__getAceRadiomonServer(callback)__
__getAceCfimaster(callback)__
__getAceAmsWeb(callback)__
__getAceAudioWeb(callback)__
__getAceAeSw(callback)__
__getAceGWorkload(callback)__
__getAceRadio(callback)__
__getAceAeConstruct(callback)__
__getAceRootd(callback)__
__getAceAeLoader(callback)__
__getAceCreditd(callback)__
__getSimscribe(callback)__
__getAceOperator(callback)__
__getAceSapi(callback)__
__getAceNetmon(callback)__
__getAceAe(callback)__
__getAceRc(callback)__
__getAceConstruct(callback)__
__getAceHapiRc(callback)__
__getAceHwdebug(callback)__
__getAceHapi(callback)__
__getAceHwrt(callback)__
__getAceCreditNet(callback)__

The followins function gets the status of of their respective service.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `JSON`:

```javascript
{
  "status": true
}
```

---------------------------------------

The following functions all have the same behavior.

__putAceAeHw(callback)__
__putAnzac(callback)__
__putAceRadiomonServer(callback)__
__putAceCfimaster(callback)__
__putAceAmsWeb(callback)__
__putAceAudioWeb(callback)__
__putAceAeSw(callback)__
__putAceGWorkload(callback)__
__putAceRadio(callback)__
__putAceAeConstruct(callback)__
__putAceRootd(callback)__
__putAceAeLoader(callback)__
__putAceCreditd(callback)__
__putSimscribe(callback)__
__putAceOperator(callback)__
__putAceSapi(callback)__
__putAceNetmon(callback)__
__putAceAe(callback)__
__putAceRc(callback)__
__putAceConstruct(callback)__
__putAceHapiRc(callback)__
__putAceHwdebug(callback)__
__putAceHapi(callback)__
__putAceHwrt(callback)__
__putAceCreditNet(callback)__

The followins function restarts the respective service. __Use with caution__.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `None`:

```javascript
None
```

---------------------------------------

The following functions all have the same behavior.

__delAceAeHw(callback)__
__delAnzac(callback)__
__delAceRadiomonServer(callback)__
__delAceCfimaster(callback)__
__delAceAmsWeb(callback)__
__delAceAudioWeb(callback)__
__delAceAeSw(callback)__
__delAceGWorkload(callback)__
__delAceRadio(callback)__
__delAceAeConstruct(callback)__
__delAceRootd(callback)__
__delAceAeLoader(callback)__
__delAceCreditd(callback)__
__delSimscribe(callback)__
__delAceOperator(callback)__
__delAceSapi(callback)__
__delAceNetmon(callback)__
__delAceAe(callback)__
__delAceRc(callback)__
__delAceConstruct(callback)__
__delAceHapiRc(callback)__
__delAceHwdebug(callback)__
__delAceHapi(callback)__
__delAceHwrt(callback)__
__delAceCreditNet(callback)__

The followins function stops the respective service. __Use with caution__.

__Arguments__

* callback(err, results) - A callback which is called after the function has finished, or an error has occurred.

__Results__

* `None`:

```javascript
None
```

---------------------------------------
for more documentation about the Voisus Server API see [support].

[support]: http://support.asti-usa.com/voisus/voisus_api.html
[docs_hapi]: https://github.com/astilabs/node-voisus/blob/master/docs/hapi.md
