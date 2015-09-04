function Element (nodeName) {
  this.nodeName = nodeName
}

module.exports = {
  createElement: function (nodeName) {
    return new Element(nodeName)
  },
  Element: Element
}
