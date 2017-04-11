var Element = require('../Element')
var mapValues = require('../utils/mapValues')

var mixin = {
  componentWillMount: function () {
    this.connectedFauxDOM = {}
    this.animateFauxDOMUntil = 0
  },
  connectFauxDOM: function (node, name) {
    this.connectedFauxDOM[name] = typeof node !== 'string' ? node : new Element(node)
    setTimeout(this.drawFauxDOM)
    return this.connectedFauxDOM[name]
  },
  drawFauxDOM: function () {
    var virtualDOM = mapValues(this.connectedFauxDOM, function (n) {
      return n.toReact()
    })
    this.setState(virtualDOM)
  }
}

module.exports = mixin
