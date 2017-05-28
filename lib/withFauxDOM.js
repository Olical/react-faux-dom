const Element = require('./Element')
const mapValues = require('./utils/mapValues')

const withFauxDOM = WrappedComponent => {
  // use inheritance inversion to access and extend WrappedComponent's
  // state and lifecycle/class methods. More details on this technique at
  // https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
  class WithFauxDOM extends WrappedComponent {
    constructor (props) {
      super(props)
      this.connectFauxDOM = this.connectFauxDOM.bind(this)
      this.drawFauxDOM = this.drawFauxDOM.bind(this)
      this.animateFauxDOM = this.animateFauxDOM.bind(this)
      this.stopAnimatingFauxDOM = this.stopAnimatingFauxDOM.bind(this)
      this.isAnimatingFauxDOM = this.isAnimatingFauxDOM.bind(this)
    }

    componentWillMount () {
      WrappedComponent.componentWillMount && super.componentWillMount()
      this.connectedFauxDOM = {}
      this.animateFauxDOMUntil = 0
    }

    componentWillUnmount () {
      WrappedComponent.componentWillUnmount && super.componentWillUnmount()
      this.stopAnimatingFauxDOM()
    }

    connectFauxDOM (node, name, discardNode) {
      if (!this.connectedFauxDOM[name] || discardNode) {
        this.connectedFauxDOM[name] = typeof node !== 'string' ? node : new Element(node)
        setTimeout(this.drawFauxDOM)
      }
      return this.connectedFauxDOM[name]
    }

    drawFauxDOM () {
      var virtualDOM = mapValues(this.connectedFauxDOM, function (n) {
        return n.toReact()
      })
      this.setState(virtualDOM)
    }

    animateFauxDOM (duration) {
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
    }

    stopAnimatingFauxDOM () {
      this.fauxDOMAnimationInterval = clearInterval(this.fauxDOMAnimationInterval)
      this.animateFauxDOMUntil = 0
    }

    isAnimatingFauxDOM () {
      return !!this.fauxDOMAnimationInterval
    }

    render () {
      return super.render()
    }
  }
  WithFauxDOM.displayName = `WithFauxDOM(${getDisplayName(WrappedComponent)})`
  return WithFauxDOM
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

module.exports = withFauxDOM
