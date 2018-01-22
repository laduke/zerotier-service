/* eslint handle-callback-err: 0 */
var test = require('tape')

var host = 'http://localhost'
var port = '12345'
var token = 'abcDEF123'

var service = require('../request-options')({ host: host, port: port, token: token })

var origin = `${host}:${port}`
var networkId = '0123456789123456'

test('Get Status', function (t) {
  var expectedOptions = {
    uri: `${origin}/status`,
    json: true,

    method: 'GET',
    headers: {
      'X-ZT1-Auth': token
    }
  }

  var options = service.get('/status')
  t.deepEqual(expectedOptions, options)
  t.end()
})

test('Leave Network', function (t) {
  var options = service.delete('/network/' + networkId)
  t.equal('DELETE', options.method)
  t.end()
})

test('Join Network', function (t) {
  var options = service.post('/network/' + networkId)
  t.equal('POST', options.method)
  t.end()
})

test('Set Network', function (t) {
  var expectedOptions = { name: 'bar' }
  var options = service.post('/network/' + networkId, { name: 'bar' })
  t.deepEqual(expectedOptions, options.body)
  t.end()
})
