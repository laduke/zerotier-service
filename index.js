var assert = require('assert')

function service (opts) {
  var host = opts.host
  var port = opts.port
  var token = opts.token

  if (process.env.NODE_ENV !== 'production') {
    assert(token, 'Please provide your auth token in the token: key')
  }

  if (!port) port = 9993
  if (!host) host = 'localhost'

  // builds options object formatted for request/request & naugtur/xhr
  function options (method) {
    return function (path, data) {
      var options = {
        uri: 'http://' + host + ':' + port + path,
        json: true,

        method: method.toUpperCase(),
        headers: {
          'X-ZT1-Auth': token
        }
      }

      if (data && method === 'POST') {
        options.body = data
      }
      return options
    }
  }

  return {
    get: options('GET'),
    post: options('POST'),
    delete: options('DELETE')
  }
}

module.exports = service
