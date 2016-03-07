var core = require('../../lib/mixins/core')
var anim = require('../../lib/mixins/anim')
var sinon = require('sinon')

function Component (noinit) {
  var comp = Object.assign({}, core, anim)
  for (var m in comp) {
    comp[m] = comp[m].bind(comp)
  }
  comp.setState = sinon.spy()
  noinit || comp.componentWillMount()
  return comp
}

module.exports = Component
