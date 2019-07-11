#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

var Service = require('./index.js')
var guessToken = require('./guess-token.js')

const authToken = argv.authToken || guessToken()
const { port, host } = argv

const service = new Service({ authToken, port, host })

const commands = {
  info: service.info,
  join: service.join,
  leave: service.leave,
  network: service.network,
  networks: service.networks,
  peer: service.peer,
  peers: service.peers,
  status: service.status,
  set: set
}

if (!authToken) {
  throw new Error('No authToken provided and none found in the usual places')
}

function set (args) {
  const [nwid, key, value] = args

  return service.set(nwid, { [key]: truthy(value) })
}

run(argv)
async function run (argv) {
  try {
    const {
      _: [command]
    } = argv

    if (!command) {
      console.log(
        `I didn't make help because this is just a demo. The commands are:`
      )
      console.log(Object.keys(commands).join('\n'))
      process.exit(1)
    }

    const { body } = await commands[command](argv._.slice(1))
    console.log(JSON.stringify(body, 0, 4))
  } catch (e) {
    console.log(e.message)
  }
}

function truthy (val) {
  return !(
    val === 'false' ||
      val === 'no' ||
      val === 'off' ||
      val === 0 ||
      val == null
  )
}
