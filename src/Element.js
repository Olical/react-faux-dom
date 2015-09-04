var camelCase = require('lodash.camelcase')

function Element (type) {
  this.type = type
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

Element.prototype.attributeToPropName = function attributeToPropName (name) {
  return this.attributeNameMappings[name] || name
}

Element.prototype.setAttribute = function setAttribute (name, value) {
  this.props[this.attributeToPropName(name)] = value
}

Element.prototype.getAttribute = function getAttribute (name) {
  return this.props[this.attributeToPropName(name)]
}

Element.prototype.removeAttribute = function removeAttribute (name) {
  delete this.props[this.attributeToPropName(name)]
}

Element.prototype.eventToPropName = function (name) {
  return this.eventNameMappings[name] || name
}

Element.prototype.addEventListener = function addEventListener (name, fn) {
  this.props[this.eventToPropName(name)] = fn
}

Element.prototype.removeEventListener = function removeEventListener (name, fn) {
  delete this.props[this.eventToPropName(name)]
}

Element.prototype.appendChild = function appendChild (type) {
  var el = new Element(type)
  el.parentNode = this
  this.children.push(el)
  return el
}

Element.prototype.removeChild = function removeChild (child) {
  var target = this.children.indexOf(child)
  this.children.splice(target, 1)
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
