var mixin = require('../../lib/mixin')
var sinon = require('sinon')

function Component (noinit) {
  var comp = Object.assign({}, mixin)
  for (var m in comp) {
    comp[m] = comp[m].bind(comp)
  }
  comp.setState = sinon.spy()
  noinit || comp.componentWillMount()
  return comp
}

module.exports = Component
