var element = require('./_element')
var window = require('./_window')
var withFauxDOM = require('./_withFauxDOM')

function factory () {
  var Element = element()
  var Window = window()
  var ReactFauxDOM = {
    Element: Element,
    defaultView: Window,
    withFauxDOM: withFauxDOM(Element),
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
  return ReactFauxDOM
}

module.exports = factory
