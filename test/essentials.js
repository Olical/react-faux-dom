var test = require('tape')
var ReactFauxDOM = require('..')

test('has a create method', function (t) {
  t.plan(1)
  t.equal(typeof ReactFauxDOM.createElement, 'function')
})

test('creates an element instance with a type', function (t) {
  t.plan(2)
  var el = ReactFauxDOM.createElement('div')
  t.ok(el instanceof ReactFauxDOM.Element)
  t.equal(el.type, 'div')
})
