var assert = require('assert')

function service (opts) {
  var host = opts.host
  var port = opts.port
  var token = opts.token

  assert(token, 'Please provide your auth token in the token: key')

  if (!port) port = 9993
  if (!host) host = 'http://localhost'

  // builds options object formatted for request/request & naugtur/xhr
  function options (method) {
    return function (path, data) {
      var options = {
        uri: host + ':' + port + path,
        json: true,

        method: method.toUpperCase(),
        headers: {
          'X-ZT1-Auth': token
        }
      }

      if ((data && method === 'POST') || (data && method === 'PUT')) {
        options.body = data
      }
      return options
    }
  }

  return {
    get: options('GET'),
    post: options('POST'),
    put: options('PUT'),
    delete: options('DELETE')
  }
}

module.exports = service
