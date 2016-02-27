var test = require('tape')
var assign = require('../../lib/utils/assign')

test('cloning an object keeps all data', function (t) {
  t.plan(1)
  var expected = {foo: true, bar: false}
  var actual = assign({}, {foo: true, bar: false})
  t.deepEqual(actual, expected)
})

test('you can not mutate the original', function (t) {
  t.plan(2)
  var a = {foo: true, bar: false}
  var b = assign({}, a)
  b.bar = true
  t.deepEqual(a, {foo: true, bar: false})
  t.deepEqual(b, {foo: true, bar: true})
})

test('you can assign values down from right to left', function (t) {
  t.plan(1)
  var a = {foo: false, bar: true}
  var b = {foo: true}
  var c = {baz: true}
  var expected = {foo: true, bar: true, baz: true}
  var actual = assign({}, a, b, c)
  t.deepEqual(actual, expected)
})
