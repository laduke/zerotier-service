/* eslint handle-callback-err: 0 */

/*
  run like
  ZT_SECRET='abcdefgabcdefgabcdefg' tape test/integration/test.js
*/

var test = require('tape')

var request = require('request')

var host = 'http://localhost'
var port = '9993'
var secret = process.env.ZT_SECRET || '1234'

test('Get Status - Node HTTP', function (t) {
  var ZeroTierOne = require('../index')(
    { host: host, port: port, token: secret },
    request
  )

  ZeroTierOne.service.getAllNetworks(function (err, res) {
    t.ok(res)
    t.end()
  })
})
