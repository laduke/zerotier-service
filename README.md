# What
Helper functions for talking to the [ZeroTier service](https://github.com/zerotier/ZeroTierOne/tree/master/service) json api.

# Example
```
const Service = require('./index.js')

const authToken = 'contents-of-authtoken.secret'
const service = new Service({ authToken })

// promise/async
run()
async function run () {
  try {
    const { body } = await service.info()
    console.log(JSON.stringify(body, 0, 4))
  } catch (e) {
    console.log(e.message)
  }
}

// callback
service.status(function (err, res, body) {
  if (err) console.error(err.message)

  console.log(JSON.stringify(body, 0, 4))
})


```

# API 
- host and port default to localhost:9993
- authToken should be the contents of ${ZEROTIER_HOME}/authtoken.secret
- callback/promise signature is from [nanorequest](https://github.com/toddself/nanorequest)
- see ./bin.js

## methods
- `info()`
- `join(networkId)`
- `leave(networkId)`
- `network(networkId)`
- `networks()`
- `peer(nodeId)`
- `peers()`
- `status()`
- `set(networkId, {allowManaged,allowPublic,allowDefault}, t/f)`
