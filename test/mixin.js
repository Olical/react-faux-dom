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

test('animateFauxDOM works as expected', function (t) {
  t.plan(3)
  var comp = Comp()
  var elem = Elem('div')
  var framecount = 0
  elem.toReact = function () {
    return ++framecount
  }
  comp.connectFauxDOM(elem, 'a_div')
  comp.connectFauxDOM('span', 'a_span')
  comp.animateFauxDOM(200) // 200 ms should equal around 200/16 = 12.5 frames
  setTimeout(function () {
    t.ok(framecount > 8 && framecount < 15)
    t.deepEqual(comp.setState.args[5][0], {
      a_div: 6,
      a_span: Elem('span').toReact()
    })
    t.deepEqual(comp.setState.args[framecount - 1][0], {
      a_div: framecount,
      a_span: Elem('span').toReact()
    })
  }, 500)
})

test('stopAnimatingFauxDOM works as expected', function (t) {
  t.plan(1)
  var comp = Comp()
  var elem = Elem('div')
  var framecount = 0
  elem.toReact = function () {
    return ++framecount
  }
  comp.connectFauxDOM(elem,'a_div')
  comp.animateFauxDOM(500)
  setTimeout(function () {
    comp.stopAnimatingFauxDOM()
  }, 200)
  setTimeout(function () {
    t.ok(framecount > 8 && framecount < 15) // should not have run for 500 ms
  }, 500)
})
