var React = require('react')
var clone = require('lodash.clone')
var styleAttr = require('style-attr')
var camelCase = require('lodash.camelcase')
var querySelectorAll = require('query-selector')

function Element (nodeName, parentNode) {
  this.nodeName = nodeName
  this.parentNode = parentNode
  this.children = []
  this.text = ''
  var props = this.props = {
    style: {
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

  this.style = props.style
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
  return this.attributeNameMappings[name] || camelCase(name)
}

Element.prototype.setAttribute = function (name, value) {
  if (name === 'style' && typeof value === 'string') {
    var styles = styleAttr.parse(value)

    for (var key in styles) {
      this.style.setProperty(key, styles[key])
    }
  } else {
    this.props[this.attributeToPropName(name)] = value
  }
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

Element.prototype.toReact = function (index) {
  index = index || 0
  var props = this.props

  function uniqueKey () {
    return 'faux-dom-' + index
  }

  if (typeof props.key === 'undefined') {
    props = clone(props)
    props.key = uniqueKey()

    delete props.style.setProperty
    delete props.style.getProperty
    delete props.style.removeProperty
  }

  return React.createElement(this.nodeName, props, this.text || this.children.map(function (el, i) {
    if (el instanceof Element) {
      return el.toReact(i)
    } else {
      return el
    }
  }))
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

// These NS methods are called by things like D3 if it spots a namespace.
// Like xlink:href. I don't care about namespaces, so these functions have NS aliases created.
var namespaceMethods = [
  'setAttribute',
  'getAttribute',
  'getAttributeNode',
  'removeAttribute',
  'getElementsByTagName',
  'getElementById'
]

namespaceMethods.forEach(function (name) {
  var fn = Element.prototype[name]
  Element.prototype[name + 'NS'] = function () {
    return fn.apply(this, Array.prototype.slice.call(arguments, 1))
  }
})

module.exports = Element
