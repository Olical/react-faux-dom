var React = require('react')
var createReactClass = require('create-react-class')
var mapValues = require('./utils/mapValues')

function withFauxDOMFactory (Element) {
  function withFauxDOM (WrappedComponent) {
    var WithFauxDOM = createReactClass({
      componentWillMount: function () {
        this.connectedFauxDOM = {}
        this.animateFauxDOMUntil = 0
      },
      componentWillUnmount: function () {
        this.stopAnimatingFauxDOM()
        this.stopDrawFauxDOM()
      },
      connectFauxDOM: function (node, name, discardNode) {
        if (!this.connectedFauxDOM[name] || discardNode) {
          this.connectedFauxDOM[name] = typeof node !== 'string' ? node : new Element(node)
          this.drawFauxDOMTimeout = setTimeout(this.drawFauxDOM)
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
      stopDrawFauxDOM: function () {
        this.drawFauxDOMTimeout = clearTimeout(this.drawFauxDOMTimeout)
      },
      isAnimatingFauxDOM: function () {
        return !!this.fauxDOMAnimationInterval
      },
      render: function () {
        var props = Object.assign({}, this.props, this.state, {
          connectFauxDOM: this.connectFauxDOM,
          drawFauxDOM: this.drawFauxDOM,
          animateFauxDOM: this.animateFauxDOM,
          stopAnimatingFauxDOM: this.stopAnimatingFauxDOM,
          isAnimatingFauxDOM: this.isAnimatingFauxDOM
        })
        return React.createElement(WrappedComponent, props)
      }
    })
    WithFauxDOM.displayName = 'WithFauxDOM(' + getDisplayName(WrappedComponent) + ')'
    return WithFauxDOM
  }

  return withFauxDOM
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

module.exports = withFauxDOMFactory
