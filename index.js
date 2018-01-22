var assert = require('assert')

module.exports = function ZeroTierOne (options, request) {
  assert.equal(typeof request, 'function', 'Please pass in the request module, or xhr')

  var service = require('./service-api')(options, request)

  return {
    service: service
  }
}
