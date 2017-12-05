/* eslint handle-callback-err: 0 */

/*
  run like
  ZT_SECRET='abcdefgabcdefgabcdefg' tape test/integration.js
  if you get a status code 401, the token is probably wrong
*/

var test = require('tape')

var http = require('http')
var request = require('request')

var host = 'http://localhost'
var port = '9993'
var secret = process.env.ZT_SECRET

var service = require('../index')({ host: host, port: port, token: secret })

test('Get Status - Node HTTP', function (t) {
  var options = service.get('/status')

  request(options, function(err, res){
    t.equal(res.statusCode, 200)
    t.end()
  })
})

test('Get Status - Bad Token', function (t) {
  var service = require('../index')({ host: host, port: port, token: 'wrong secret' })
  var options = service.get('/status')

  request(options, function (err, res, body) {
    t.equal(res.statusCode, 401)
    t.end()
  })
})
