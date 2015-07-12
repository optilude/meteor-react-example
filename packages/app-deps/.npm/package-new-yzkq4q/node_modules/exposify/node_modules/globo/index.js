'use strict'

var printf = require('pff')

module.exports = function globalize (id) {
  var hasWindow = 'typeof window !== "undefined"'
  var hasGlobal = 'typeof global !== "undefined"'
  return printf('(%s ? window.%s : %s ? global.%s : null)', hasWindow, id, hasGlobal, id)
}
