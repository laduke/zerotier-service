var os = require('os')
var fs = require('fs')
var path = require('path')

module.exports = function guessToken () {
  const tokenPaths = {
    darwin: path.join(
      os.homedir(),
      'Library',
      'Application Support',
      'ZeroTier',
      'One',
      'authtoken.secret'
    ),
    win32: path.join('ProgramData', 'ZeroTier One', 'authtoken.secret')
  }

  const nix = path.join('var', 'lib', 'zerotier-one', 'authtoken.secret')

  return fs.readFileSync(tokenPaths[os.platform()] || nix, { encoding: 'utf8' })
}
