var test = require('tape')
var ReactFauxDOM = require('..')
var Comp = require('./test-utils/component')
// var mixin = require('../lib/mixin')

var Elem = ReactFauxDOM.createElement

test('isAnimatingFauxDOM works as expected', function (t) {
  t.plan(2)
  var comp = Comp()
  t.equal(comp.isAnimatingFauxDOM(), false)
  comp.fauxDOMAnimationInterval = true
  t.equal(comp.isAnimatingFauxDOM(), true)
})

test('drawing and connecting works as expected', function (t) {
  t.plan(5)
  var comp = Comp()
  comp.connectFauxDOM('div', 'a_div')
  comp.connectFauxDOM(Elem('span'), 'a_span')
  comp.drawFauxDOM()
  t.equal(comp.setState.callCount, 1)
  var drew = comp.setState.args[0][0]
  t.deepEqual(drew, {
    a_div: Elem('div').toReact(),
    a_span: Elem('span').toReact()
  })
  setTimeout(function () {
    // should have made one additional draw call per connection
    t.equal(comp.setState.callCount, 3)
    t.deepEqual(drew, comp.setState.args[1][0])
    t.deepEqual(drew, comp.setState.args[2][0])
  }, 100)
})
