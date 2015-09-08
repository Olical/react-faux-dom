var test = require('tape')
var ReactFauxDOM = require('..')

test('has a create method', function (t) {
  t.plan(1)
  t.equal(typeof ReactFauxDOM.createElement, 'function')
})

test('creates an element instance with a nodeName', function (t) {
  t.plan(2)
  var el = ReactFauxDOM.createElement('div')
  t.ok(el instanceof ReactFauxDOM.Element)
  t.equal(el.nodeName, 'div')
})

test('hyphenated properties are camel cased', function (t) {
  var el = ReactFauxDOM.createElement('div')
  el.setAttribute('text-align', 'right')
  t.plan(3)
  t.equal(el.getAttribute('text-align'), 'right')
  t.equal(el.getAttribute('textAlign'), 'right')
  t.equal(el.toReact().props.textAlign, 'right')
})
