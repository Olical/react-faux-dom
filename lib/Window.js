var Window = {
  getComputedStyle: function (node) {
    return {
      getPropertyValue: node.style.getProperty
    }
  }
}

module.exports = Window
