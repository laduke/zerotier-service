var http = require('http')
var test = require('tape')
const concat = require('concat-stream')

var Service = require('./index.js')

// var nwid = '8056c2e21c000001'
var commonOptions = { authToken: '123' }

test('it requires an authToken', function (t) {
  t.plan(2)

  var options = { authToken: '123' }
  t.ok(Service(options))

  options = {}
  t.throws(() => Service(options))
})

test('default host is localhost', function (t) {
  t.plan(1)
  t.equal(Service(commonOptions)._host, '127.0.0.1')
  t.end()
})

test('default port is 9993', function (t) {
  t.plan(1)
  t.equal(Service(commonOptions)._port, 9993)
  t.end()
})

test('can get things', function (t) {
  t.plan(3)

  var url = '/status'
  var authToken = 'asdf'

  http
    .createServer((req, res) => {
      res.setHeader('content-type', 'application/json;encoding=utf-8')
      res.end('{"address": "whatever"}')

      t.equal(req.url, url)
      t.equal(
        req.headers['x-zt1-auth'],
        authToken,
        'has a x-zt1-auth token header'
      )
      t.equal(req.method, 'GET', 'is a get request')
    })
    .listen(0, function () {
      var self = this

      var port = this.address().port
      var service = Service({ port, authToken })

      service
        .get({ path: url })
        .then(() => {
          self.close(t.end)
        })
        .catch(err => self.close(t.end(err)))
    })
})

test('can post things and get the result', function (t) {
  t.plan(4)

  var url = '/network'
  var authToken = 'asdf'

  http
    .createServer((req, res) => {
      res.setHeader('content-type', 'application/json;encoding=utf-8')

      const collect = concat(buf => res.end(buf.toString('utf8')))

      t.equal(req.url, url)
      t.equal(
        req.headers['x-zt1-auth'],
        authToken,
        'has a x-zt1-auth token header'
      )
      t.equal(req.method, 'POST')

      req.pipe(collect)
    })
    .listen(0, function () {
      var self = this

      var port = this.address().port
      var service = Service({ port, authToken })

      service
        .post({ path: url, body: { some: 'thing' } })
        .then(({ body }) => {
          t.equal(body.some, 'thing')
          self.close(t.end)
        })
        .catch(err => self.close(t.end(err)))
    })
})

test('can delete things and get the result', function (t) {
  t.plan(4)

  var url = '/network'
  var authToken = 'asdf'

  http
    .createServer((req, res) => {
      res.setHeader('content-type', 'application/json;encoding=utf-8')

      const collect = concat(buf => res.end(buf.toString('utf8')))

      t.equal(req.url, url)
      t.equal(req.headers['x-zt1-auth'], authToken)
      t.equal(req.method, 'DELETE')

      req.pipe(collect)
    })
    .listen(0, function () {
      var self = this

      var port = this.address().port
      var service = Service({ port, authToken })

      service
        .delete({ path: url, body: { some: 'thing' } })
        .then(({ body }) => {
          t.equal(body.some, 'thing')
          self.close(t.end)
        })
        .catch(err => self.close(t.end(err)))
    })
})

test('it really works', function (t) {
  // needs zerotier-one running on your machine
  // npm -s run test -- --realToken=`cat ~/Library/Application\ Support/ZeroTier/One/authtoken.secret
  var argv = require('minimist')(process.argv.slice(2))
  var { realToken } = argv

  if (realToken) {
    var service = Service({ port: 9993, authToken: realToken })
    var url = '/status'

    service
      .get({ path: url })
      .then(({ body }) => {
        t.assert(!!body.address)
        t.end()
      })
      .catch(err => t.error(err.message))
  } else {
    t.end()
  }
})
