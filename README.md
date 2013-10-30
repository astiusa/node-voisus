# Node Voisus

This module provides access to maintenance and oversight over the voisus client and server.

## Installation:

```javascript
npm install voisus
```

## Usage:

```javascript
var nVoisus = require('voisus');
var hapi = nVoisus.createHapi('IPAddress');
hapi."method"(args, function(err, result) {
	...
});
```


# Documentation
- [hapi][docs_hapi]
- [Scenarios][docs_scenarios]
- [Sessions][docs_sessions]
- [Users][docs_users]

[docs_scenarios]: https://github.com/astilabs/node-voisus/blob/master/docs/scenarios.md
[docs_sessions]: https://github.com/astilabs/node-voisus/blob/master/docs/sessions.md
[docs_users]: https://github.com/astilabs/node-voisus/blob/master/docs/users.md
