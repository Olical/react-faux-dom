var test = require('tape')
var ReactFauxDOM = require('..')
var Comp = require('./test-utils/component')
var sinon = require('sinon')

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
  t.plan(4)
  var comp = Comp()
  var elem = Elem('div')
  var framecount = 0
  elem.toReact = function () {
    return ++framecount
  }
  comp.connectFauxDOM(elem, 'a_div')
  comp.connectFauxDOM('span', 'a_span')
  comp.animateFauxDOM(1000)
  t.ok(comp.animateFauxDOMUntil > Date.now() + 950 && comp.animateFauxDOMUntil < Date.now() + 1050)

  // now setting limit to just 200ms from now to see if it is respected
  comp.animateFauxDOMUntil = Date.now() + 200

  // 200 ms should equal around 200/16 = 12.5 frames
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

test('animateFauxDOM doesnt overwrite existing longer duration', function (t) {
  t.plan(1)
  var comp = Comp()
  comp.animateFauxDOM(1000)
  comp.animateFauxDOM(100)
  t.ok(comp.animateFauxDOMUntil > Date.now() + 950 && comp.animateFauxDOMUntil < Date.now() + 1050)
})

test('stopAnimatingFauxDOM works as expected', function (t) {
  t.plan(3)
  var comp = Comp()
  var elem = Elem('div')
  var framecount = 0
  elem.toReact = function () {
    return ++framecount
  }
  comp.connectFauxDOM(elem, 'a_div')
  comp.animateFauxDOM(500)
  setTimeout(function () {
    t.ok(comp.animateFauxDOMUntil > 0)
    comp.stopAnimatingFauxDOM()
    t.equal(comp.animateFauxDOMUntil, 0)
  }, 200)
  setTimeout(function () {
    t.ok(framecount > 8 && framecount < 15) // should not have run for 500 ms
  }, 500)
})

test('componentWillMount initialises correctly', function (t) {
  t.plan(2)
  var comp = Comp(true)
  comp.componentWillMount()
  t.deepEqual(comp.connectedFauxDOM, {})
  t.deepEqual(comp.animateFauxDOMUntil, 0)
})

test('componentWillUnmount cleans up correctly', function (t) {
  t.plan(1)
  var comp = Comp()
  comp.stopAnimatingFauxDOM = sinon.spy()
  comp.componentWillUnmount()
  t.equal(comp.stopAnimatingFauxDOM.callCount, 1)
})
