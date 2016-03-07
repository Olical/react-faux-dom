var anim = {
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
  componentWillUnmount: function () {
    this.stopAnimatingFauxDOM()
  }
}

module.exports = anim
