var Element = require('./Element')
var Window = require('./Window')

var ReactFauxDOM = {
  Element: Element,
  defaultView: Window,
  createElement: function createElement (type) {
    return new Element(type)
  }
}

Element.prototype.ownerDocument = ReactFauxDOM

module.exports = ReactFauxDOM
