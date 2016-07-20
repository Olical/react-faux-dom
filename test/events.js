var d3 = require('d3')
var test = require('tape')
var sinon = require('sinon')
var mk = require('./test-utils/mk')

var lastEvent

function mkWithEvents () {
  var clickEvent = sinon.spy(function () {
    lastEvent = d3.event
  })
  var mousedownEvent = sinon.spy()

  var el = mk()
  el.on('click', clickEvent)
  el.node().addEventListener('mousedown', mousedownEvent)

  return {
    el: el,
    clickEvent: clickEvent,
    mousedownEvent: mousedownEvent
  }
}

test('adding listeners', function (t) {
  var node = mkWithEvents().el.node()
  var eventListeners = node.eventListeners
  t.plan(3)
  t.equal(eventListeners.onClick.length, 1)
  t.ok(eventListeners.onClick instanceof Array)
  t.equal(typeof eventListeners.onClick[0], 'function')
})

test('executing listeners', function (t) {
  var out = mkWithEvents()
  var clickEvent = out.clickEvent
  var node = out.el.node()

  var props = node.toReact().props
  t.plan(2)
  t.equal(typeof props.onClick, 'function')
  props.onClick()
  t.ok(clickEvent.calledOnce)
})

test('executed with native event (which contains synthetic)', function (t) {
  var node = mkWithEvents().el.node()
  var props = node.toReact().props
  var syntheticEvent = {
    isSynthetic: true,
    nativeEvent: {
      isNative: true
    }
  }
  props.onClick(syntheticEvent)
  t.plan(2)
  t.ok(lastEvent.isNative)
  t.ok(lastEvent.syntheticEvent.isSynthetic)
})

test('removing listeners', function (t) {
  var node = mkWithEvents().el.node()
  var eventListeners = node.eventListeners
  node.removeEventListener('click', eventListeners.onClick[0])
  t.plan(1)
  t.equal(eventListeners.onClick.length, 0)
})

test('event listeners on children', function (t) {
  var el = mk()
  var datum = { property: 'value' }
  var clickValue = 'initial'
  var join = el.selectAll('.foo').data([datum])
  join.enter()
      .append('svg:rect')
      .classed('foo', true)
      .attr('id', 'foo')
      .on('click', function (d) { clickValue = d })
  el.node().getElementById('foo').toReact().props.onClick()
  t.plan(1)
  t.equal(clickValue, datum)
})
