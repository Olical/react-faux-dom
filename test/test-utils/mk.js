var React = require('React')
var ReactFauxDOM = require('../..')(React)
var d3 = require('d3')

function mk () {
  var sel = d3.select(ReactFauxDOM.createElement('div'))
  sel.ownerDocument = ReactFauxDOM
  return sel
}

module.exports = mk
