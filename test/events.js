var test = require('tape')
var sinon = require('sinon')
var mk = require('./utils/mk')

function mkWithEvents () {
  var el = mk()
  el.on('click', sinon.spy())
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
  t.ok(listeners.onClick[0].calledOnce)
  t.ok(listeners.onClick[1].calledOnce)
})

// test('executed with native event')
// test('event contains React event (this is cyclic)')
// test('removing listeners')
