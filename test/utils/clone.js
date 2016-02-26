var test = require('tape')
var clone = require('../../lib/utils/clone')

test('cloning an object keeps all data', function (t) {
  t.plan(1)
  var expected = {foo: true, bar: false}
  var actual = clone({foo: true, bar: false})
  t.deepEqual(actual, expected)
})

test('you can not mutate the original', function (t) {
  t.plan(2)
  var a = {foo: true, bar: false}
  var b = clone(a)
  b.bar = true
  t.deepEqual(a, {foo: true, bar: false})
  t.deepEqual(b, {foo: true, bar: true})
})
