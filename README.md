# What
Helper functions for talking to the [ZeroTier service](https://github.com/zerotier/ZeroTierOne/tree/master/service) json api. Returns options objects suitable for passing to [request](https://github.com/request/request) (or `xhr`, or `request-promise`... )

# Example
- see test/integration.js

```

var host = 'localhost'
var port = 9993
var token = 'abcDEF123' // your authtoken.secret

var request = require('request')
var service = require('zerotier-service')({ host: host, port: port, token: token })

var options = service.get('/status')

request(options, function(err, res, body) {
  console.log(body)
})

```

# API 
- service.get('/path')
- service.post('/path', { data: data })
- service.delete('/path')
- host and port default to the default to localhost:9993
