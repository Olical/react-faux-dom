var d3 = require('d3')
var test = require('tape')
var sinon = require('sinon')
var mk = require('./utils/mk')

var lastEvent

function mkWithEvents () {
  var el = mk()
  el.on('click', sinon.spy(function () {
    lastEvent = d3.event
  }))
  el.on('click', sinon.spy())
  return el
}

test('adding listeners', function (t) {
  var el = mkWithEvents()
  var eventListeners = el.node().eventListeners
  t.plan(4)
  t.equal(eventListeners.onClick.length, 2)
  t.ok(eventListeners.onClick instanceof Array)
  t.equal(typeof eventListeners.onClick[0], 'function')
  t.equal(typeof eventListeners.onClick[1], 'function')
})

test('executing listeners', function (t) {
  var el = mkWithEvents().node()
  var listeners = el.eventListeners
  var props = el.toReact().props
  t.plan(3)
  t.equal(typeof props.onClick, 'function')
  props.onClick()
  t.ok(listeners.onClick[0]._.calledOnce)
  t.ok(listeners.onClick[1]._.calledOnce)
})

test('executed with native event (which contains synthetic)', function (t) {
  var el = mkWithEvents().node()
  var props = el.toReact().props
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
  var el = mkWithEvents()
  var eventListeners = el.node().eventListeners
  var remaining = eventListeners.onClick[1]
  el.node().removeEventListener('click', eventListeners.onClick[0])
  t.plan(2)
  t.equal(eventListeners.onClick.length, 1)
  t.equal(eventListeners.onClick[0], remaining)
})
