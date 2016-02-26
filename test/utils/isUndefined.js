var test = require('tape')
var isString = require('../../lib/utils/isString')

test('not a string', function (t) {
  t.plan(1)
  t.notOk(isString(123))
})

test('is a string', function (t) {
  t.plan(1)
  t.ok(isString('123'))
})
