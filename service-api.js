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

  return {
    createNetwork: createNetwork,
    updateNetwork: updateNetwork,
    deleteNetwork: deleteNetwork,
    getAllNetworks: getAllNetworks
  }
}

function handleServiceResult (cb) {
  return function (err, res, body) {
    if (err) return cb(err)
    if (res.statusCode !== 200) return cb(res)

    cb(null, body)
  }
}
