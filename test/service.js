var test = require('tape')
var sinon = require('sinon')

var options = ({ token: '123' })

test('Calls request - create', function (t) {
  var request = sinon.stub().callsArgWith(1, null, 'request')
  var serviceApi = require('../service-api')(options, request)

  serviceApi.createNetwork('8056c2e21c000001', {}, function () {
    t.ok(request.called)
    t.end()
  })
})

test('Calls request - update', function (t) {
  var request = sinon.stub().callsArgWith(1, null, 'request')
  var serviceApi = require('../service-api')(options, request)

  serviceApi.updateNetwork('8056c2e21c000001', {}, function () {
    t.ok(request.called)
    t.end()
  })
})

test('Calls request - delete', function (t) {
  var request = sinon.stub().callsArgWith(1, null, 'request')
  var serviceApi = require('../service-api')(options, request)

  serviceApi.deleteNetwork('8056c2e21c000001', function () {
    t.ok(request.called)
    t.end()
  })
})

test('Calls request - list', function (t) {
  var request = sinon.stub().callsArgWith(1, null, 'request')
  var serviceApi = require('../service-api')(options, request)

  serviceApi.getAllNetworks(function () {
    t.ok(request.called)
    t.end()
  })
})

test('Calls request - listpeers', function (t) {
  var request = sinon.stub().callsArgWith(1, null, 'request')
  var serviceApi = require('../service-api')(options, request)

  serviceApi.getAllPeers(function () {
    t.ok(request.called)
    t.end()
  })
})


test('Calls request - some error', function (t) {
  var err = new Error()
  err.code = 'ECONNREFUSED'

  var request = sinon.stub().callsArgWith(1, err)
  var serviceApi = require('../service-api')(options, request)

  serviceApi.updateNetwork('8056c2e21c000001', {}, function (err, res) {
    t.ok(request.called)
    t.ok(err)
    t.end()
  })
})

test('Calls request - auth error', function (t) {
  var res = {}
  res.statusCode = 401

  var request = sinon.stub().callsArgWith(1, null, res)
  var serviceApi = require('../service-api')(options, request)

  serviceApi.updateNetwork('8056c2e21c000001', {}, function (err, res) {
    t.ok(request.called)
    t.ok(err)
    t.end()
  })
})

test('Calls request - not found error', function (t) {
  var res = {}
  res.statusCode = 404

  var request = sinon.stub().callsArgWith(1, null, res)
  var serviceApi = require('../service-api')(options, request)

  serviceApi.updateNetwork('8056c2e21c000001', {}, function (err, res) {
    t.ok(request.called)
    t.ok(err)
    t.end()
  })
})
