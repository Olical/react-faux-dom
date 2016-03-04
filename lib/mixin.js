var Element = require('./Element'),
	mapValues = require('./utils/mapValues');

module.exports = {
	componentWillMount: function(){
		this.connectedFauxDOM = {};
		this.animateFauxDOMUntil = 0;
	},
	connectFauxDOM: function(node,name){
		this.connectedFauxDOM[name] = typeof node !== 'string' ? node : new Element(node);
		setTimeout(this.drawFauxDOM);
		return this.connectedFauxDOM[name];
	},
	drawFauxDOM: function(){
		var virtualDOM = mapValues(this.connectedFauxDOM,function(n){
			return n.toReact();
		});
		this.setState(virtualDOM);
	},
	animateFauxDOM: function(duration){
		this.animateFauxDOMUntil = Math.max(Date.now() + duration, this.animateFauxDOMUntil);
		if (!this.fauxDOMAnimationInterval){
			this.fauxDOMAnimationInterval = setInterval(function(){
				if (Date.now()<this.animateFauxDOMUntil){
					this.drawFauxDOM();
				} else {
					this.stopAnimatingFauxDOM();
				}
			}.bind(this),16);
		}
	},
	stopAnimatingFauxDOM: function(){
		this.fauxDOMAnimationInterval = clearInterval(this.fauxDOMAnimationInterval);
		this.animateFauxDOMUntil = 0;
	},
	isAnimatingFauxDOM: function(){
		return !!this.fauxDOMAnimationInterval;
	},
	componentWillUnmount: function(){
		this.stopAnimatingFauxDOM();
	}
};