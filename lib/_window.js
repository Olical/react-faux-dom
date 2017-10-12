function window () {
  var Window = {
    getComputedStyle: function (node) {
      return {
        getPropertyValue: node.style.getProperty
      }
    }
  }

  return Window
}

module.exports = window
