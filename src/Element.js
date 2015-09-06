var querySelectorAll = require('query-selector')
var camelCase = require('lodash.camelcase')

function Element (nodeName, parentNode) {
  this.nodeName = nodeName
  this.parentNode = parentNode
  this.children = []
  var props = this.props = {
    style: {}
  }
  this.text = ''

  this.style = {
    setProperty: function (name, value) {
      props.style[camelCase(name)] = value
    },
    getProperty: function (name) {
      return props.style[camelCase(name)]
    },
    removeProperty: function (name) {
      delete props.style[camelCase(name)]
    }
  }
}

Element.prototype.nodeType = 1

// This was easy to do with Vim.
// Just saying.
Element.prototype.eventNameMappings = {
  'blur': 'onBlur',
  'change': 'onChange',
  'click': 'onClick',
  'contextmenu': 'onContextMenu',
  'copy': 'onCopy',
  'cut': 'onCut',
  'doubleclick': 'onDoubleClick',
  'drag': 'onDrag',
  'dragend': 'onDragEnd',
  'dragenter': 'onDragEnter',
  'dragexit': 'onDragExit',
  'dragleave': 'onDragLeave',
  'dragover': 'onDragOver',
  'dragstart': 'onDragStart',
  'drop': 'onDrop',
  'error': 'onError',
  'focus': 'onFocus',
  'input': 'onInput',
  'keydown': 'onKeyDown',
  'keypress': 'onKeyPress',
  'keyup': 'onKeyUp',
  'load': 'onLoad',
  'mousedown': 'onMouseDown',
  'mouseenter': 'onMouseEnter',
  'mouseleave': 'onMouseLeave',
  'mousemove': 'onMouseMove',
  'mouseout': 'onMouseOut',
  'mouseover': 'onMouseOver',
  'mouseup': 'onMouseUp',
  'paste': 'onPaste',
  'scroll': 'onScroll',
  'submit': 'onSubmit',
  'touchcancel': 'onTouchCancel',
  'touchend': 'onTouchEnd',
  'touchmove': 'onTouchMove',
  'touchstart': 'onTouchStart',
  'wheel': 'onWheel'
}

Element.prototype.attributeNameMappings = {
  'class': 'className'
}

Element.prototype.attributeToPropName = function (name) {
  return this.attributeNameMappings[name] || name
}

Element.prototype.setAttribute = function (name, value) {
  this.props[this.attributeToPropName(name)] = value
}

Element.prototype.getAttribute = function (name) {
  return this.props[this.attributeToPropName(name)]
}

Element.prototype.getAttributeNode = function (name) {
  var value = this.getAttribute(name)

  if (typeof value !== 'undefined') {
    return {
      value: value,
      specified: true
    }
  }
}

Element.prototype.removeAttribute = function (name) {
  delete this.props[this.attributeToPropName(name)]
}

Element.prototype.eventToPropName = function (name) {
  return this.eventNameMappings[name] || name
}

Element.prototype.addEventListener = function (name, fn) {
  this.props[this.eventToPropName(name)] = fn
}

Element.prototype.removeEventListener = function (name, fn) {
  delete this.props[this.eventToPropName(name)]
}

Element.prototype.appendChild = function (el) {
  el.parentNode = this
  this.children.push(el)
  return el
}

Element.prototype.insertBefore = function (el, before) {
  var index = this.children.indexOf(before)
  el.parentNode = this

  if (index !== -1) {
    this.children.splice(index, 0, el)
  } else {
    this.children.push(el)
  }

  return el
}

Element.prototype.removeChild = function (child) {
  var target = this.children.indexOf(child)
  this.children.splice(target, 1)
}

Element.prototype.querySelector = function () {
  return this.querySelectorAll.apply(this, arguments)[0]
}

Element.prototype.querySelectorAll = function (selector) {
  return querySelectorAll(selector, this)
}

Element.prototype.getElementsByTagName = function (nodeName) {
  var children = this.children

  if (children.length === 0) {
    return []
  } else {
    var matches

    if (nodeName !== '*') {
      matches = children.filter(function (el) {
        return el.nodeName === nodeName
      })
    } else {
      matches = children
    }

    var childMatches = children.map(function (el) {
      return el.getElementsByTagName(nodeName)
    })

    return matches.concat.apply(matches, childMatches)
  }
}

Element.prototype.getElementById = function (id) {
  var children = this.children

  if (children.length === 0) {
    return null
  } else {
    var match = children.filter(function (el) {
      return el.getAttribute('id') === id
    })[0]

    if (match) {
      return match
    } else {
      var childMatches = children.map(function (el) {
        return el.getElementById(id)
      })

      return childMatches.filter(function (match) {
        return match !== null
      })[0] || null
    }
  }
}

Object.defineProperties(Element.prototype, {
  nextSibling: {
    get: function () {
      var siblings = this.parentNode.children
      var me = siblings.indexOf(this)
      return siblings[me + 1]
    }
  },
  previousSibling: {
    get: function () {
      var siblings = this.parentNode.children
      var me = siblings.indexOf(this)
      return siblings[me - 1]
    }
  },
  innerHTML: {
    get: function () {
      return this.text
    },
    set: function (text) {
      this.text = text
    }
  },
  textContent: {
    get: function () {
      return this.text
    },
    set: function (text) {
      this.text = text
    }
  }
})

module.exports = Element
