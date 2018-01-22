# What
Helper functions for talking to the [ZeroTier service](https://github.com/zerotier/ZeroTierOne/tree/master/service) json api. Returns options objects suitable for passing to [request](https://github.com/request/request) (or `xhr`, or `request-promise`... )

# Example
- see test/integration.js

```

var request = require('request')

var host = 'http://localhost'
var port = '9993'
var secret = process.env.ZT_SECRET || '1234'

var ZeroTierOne = require('../index')(
  { host: host, port: port, token: secret },
  request
)

ZeroTierOne.service.getAllNetworks(function (err, res) {
  console.log(res)
})


```

# API 
- host and port default to localhost:9993
- callback signature is `function (err, res) {}`
## service
- `createNetwork(networkId, settings, callback)`
- `updateNetwork(networkId, settings, callback)`
- `deleteNetwork(networkId, callback)`
- `getAllNetworks(callback)`

## controller
- TODO


