var test = require('tape')
var styleCamelCase = require('../../lib/utils/styleCamelCase')

test('works like normal camelCase', function (t) {
  t.plan(1)
  var expected = 'fooBar'
  var actual = styleCamelCase(expected)
  t.strictEqual(actual, expected)
})

test('upper case first if starts with hyphen', function (t) {
  t.plan(1)
  var expected = 'FooBar'
  var actual = styleCamelCase('-foo-bar')
  t.strictEqual(actual, expected)
})

test('ms is an exception to the upper case first rule', function (t) {
  t.plan(1)
  var expected = 'msFooBar'
  var actual = styleCamelCase('-ms-foo-bar')
  t.strictEqual(actual, expected)
})
