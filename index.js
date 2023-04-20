var assert = require('assert')
var request = require('nanorequest').nanorequest

class Service {
  constructor ({ authToken, host = 'localhost', port = 9993 }) {
    assert(
      typeof authToken === 'string',
      'We need an authToken to talk to the service.'
    )
    this._host = host
    this._port = port

    this._headers = {
      'X-ZT1-Auth': authToken,
      'content-type': 'application/json'
    }

    this.defaultOpts = {
      host: this._host,
      port: this._port,
      headers: this._headers
    }

    this.status = this.status.bind(this)
    this.info = this.info.bind(this)
    this.peers = this.peers.bind(this)
    this.peer = this.peer.bind(this)
    this.networks = this.networks.bind(this)
    this.network = this.network.bind(this)
    this.join = this.join.bind(this)
    this.leave = this.leave.bind(this)
    this.set = this.set.bind(this)
  }

  get (opts, cb) {
    opts = {
      method: 'GET',
      ...this.defaultOpts,
      ...opts
    }
    return request(opts, cb)
  }

  post (opts, cb) {
    opts = {
      method: 'POST',
      ...this.defaultOpts,
      ...opts
    }
    return request(opts, cb)
  }

  delete (opts, cb) {
    opts = {
      method: 'DELETE',
      ...this.defaultOpts,
      ...opts
    }
    return request(opts, cb)
  }

  status (cb) {
    return this.get({ path: '/status' }, cb)
  }

  info (cb) {
    return this.get({ path: '/info' }, cb)
  }

  peers (cb) {
    return this.get({ path: '/peer' }, cb)
  }

  networks (cb) {
    return this.get({ path: '/network' }, cb)
  }

  network (nwid, cb) {
    return this.get({ path: `/network/${nwid}` }, cb)
  }

  peer (nodeId, cb) {
    return this.get({ path: `/peer/${nodeId}` }, cb)
  }

  join (nwid, cb) {
    return this.post({ path: `/network/${nwid}` }, cb)
  }

  leave (nwid, cb) {
    return this.delete({ path: `/network/${nwid}` }, cb)
  }

  set (nwid, props, cb) {
    assert(typeof nwid === 'string', 'Need a Network ID. got ' + nwid)

    assert(
      Object.keys(props).every(key =>
        ztSettings.includes(key)
      ),
      'Allowed settings are: ' + ztSettings.join(', ')
    )

    props = Object.keys(props).reduce((acc, key) => {
      return { ...acc, [key]: props[key] }
    }, {})

    return this.post({ path: `/network/${nwid}`, body: props }, cb)
  }
}

const ztSettings = ['allowDefault', 'allowManaged', 'allowGlobal']

module.exports = function (opts) {
  return new Service(opts)
}
