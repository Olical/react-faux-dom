var test = require('tape')
var mapValues = require('../../lib/utils/mapValues')

test('maps to another object', function (t) {
  t.plan(1)
  var obj = {a: 1, b: 2, c: 3}
  var actual = mapValues(obj, function (n) {
    return n + 1
  })
  var expected = {a: 2, b: 3, c: 4}
  t.deepEqual(actual, expected)
})
