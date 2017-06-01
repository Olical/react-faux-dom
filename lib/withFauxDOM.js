var Element = require('./Element')
var mapValues = require('./utils/mapValues')
var createClass = require('create-react-class')

function withFauxDOM (WrappedComponent) {
  // use inheritance inversion to access and extend WrappedComponent's
  // state and lifecycle/class methods. More details on this technique at
  // https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

  function applySuper (name, args) {
    var fn = WrappedComponent.prototype[name]

    if (typeof fn === 'function') {
      fn.apply(this, args)
    }
  }

  var WithFauxDOM = createClass({
    componentWillMount: function () {
      applySuper('componentWillMount')
      this.connectedFauxDOM = {}
      this.animateFauxDOMUntil = 0
    },

    componentWillUnmount: function () {
      applySuper('componentWillUnmount')
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
      return WrappedComponent.prototype.render()
    }
  })

  WithFauxDOM.displayName = ['WithFauxDOM(', getDisplayName(WrappedComponent), ')'].join('')

  return WithFauxDOM
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

module.exports = withFauxDOM
