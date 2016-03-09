var Element = require('./Element')
var Window = require('./Window')
var core = require('./mixins/core')
var anim = require('./mixins/anim')

var ReactFauxDOM = {
  Element: Element,
  defaultView: Window,
  mixins: {
    core: core,
    anim: anim
  },
  createElement: function (nodeName) {
    return new Element(nodeName)
  },
  createElementNS: function (namespace, nodeName) {
    return this.createElement(nodeName)
  },
  compareDocumentPosition: function () {
    // The selector engine tries to validate with this, but we don't care.
    // 8 = DOCUMENT_POSITION_CONTAINS, so we say all nodes are in this document.
    return 8
  }
}

Element.prototype.ownerDocument = ReactFauxDOM

module.exports = ReactFauxDOM
