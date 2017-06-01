var Element = require('./Element')
var mapValues = require('./utils/mapValues')
var createClass = require('create-react-class')
var React = require('react')

function withFauxDOM (Child) {
  var Parent = createClass({
    componentWillMount: function () {
      this.connectedFauxDOM = {}
      this.animateFauxDOMUntil = 0
    },

    componentWillUnmount: function () {
      this.stopAnimatingFauxDOM()
    },

    connectFauxDOM: function (node, name, discardNode) {
      if (!this.connectedFauxDOM[name] || discardNode) {
        this.connectedFauxDOM[name] = typeof node !== 'string' ? node : new Element(node)
        setTimeout(this.drawFauxDOM)
      }
      return this.connectedFauxDOM[name]
    },

    drawFauxDOM: function () {
      var virtualDOM = mapValues(this.connectedFauxDOM, function (n) {
        return n.toReact()
      })
      this.setState(virtualDOM)
    },

    animateFauxDOM: function (duration) {
      this.animateFauxDOMUntil = Math.max(Date.now() + duration, this.animateFauxDOMUntil)
      if (!this.fauxDOMAnimationInterval) {
        this.fauxDOMAnimationInterval = setInterval(function () {
          if (Date.now() < this.animateFauxDOMUntil) {
            this.drawFauxDOM()
          } else {
            this.stopAnimatingFauxDOM()
          }
        }.bind(this), 16)
      }
    },

    stopAnimatingFauxDOM: function () {
      this.fauxDOMAnimationInterval = clearInterval(this.fauxDOMAnimationInterval)
      this.animateFauxDOMUntil = 0
    },

    isAnimatingFauxDOM: function () {
      return !!this.fauxDOMAnimationInterval
    },

    render: function () {
      var props = Object.assign({}, this.props, this)
      return React.createElement(Child, props, this.children)
    }
  })

  Parent.displayName = ['WithFauxDOM(', getDisplayName(Child), ')'].join('')

  return Parent
}

function getDisplayName (component) {
  return component.displayName || component.name || 'Component'
}

module.exports = withFauxDOM
