var requestOptions = require('./request-options')

module.exports = function (options, request) {
  var service = requestOptions(options)

  function createNetwork (networkId, settings, cb) {
    var options = service.post('/network/' + networkId, settings)
    request(options, handleServiceResult(cb))
  }

  function deleteNetwork (networkId, cb) {
    var options = service.delete('/network/' + networkId)
    request(options, handleServiceResult(cb))
  }

  function updateNetwork (networkId, settings, cb) {
    var options = service.put('/network/' + networkId, settings)
    request(options, handleServiceResult(cb))
  }

  function getAllNetworks (cb) {
    var options = service.get('/network')
    request(options, handleServiceResult(cb))
  }

  function getAllPeers (cb) {
    var options = service.get('/peer')
    request(options, handleServiceResult(cb))
  }


  function getStatus (cb) {
    var options = service.get('/status')
    request(options, handleServiceResult(cb))
  }

  return {
    createNetwork: createNetwork,
    updateNetwork: updateNetwork,
    deleteNetwork: deleteNetwork,
    getAllNetworks: getAllNetworks,
    getAllPeers: getAllPeers,
    getStatus: getStatus
  }
}

function handleServiceResult (cb) {
  return function (err, res, body) {
    if (err) return cb(handleErr(err))
    if (res.statusCode !== 200 || err) return cb(handleStatus(res))

    cb(null, body)
  }
}

function handleErr (err) {
  if (err.errno === 'ECONNREFUSED') {
    err.message = err.message + '. Is the ZeroTier service running?'
    err.statusCode = 503
  }

  return err
}

function handleStatus (res) {
  var statusCode = res.statusCode
  var message = res.message

  if (statusCode === 401) {
    message = 'Probably the auth token is wrong'
  }
  var e = new Error(message || '')
  e.statusCode = statusCode || 500
  return e
}
