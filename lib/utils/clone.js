var mapValues = require('./mapValues')

function clone (value) {
  return mapValues(value, function (n) {
    return n
  })
}

module.exports = clone
