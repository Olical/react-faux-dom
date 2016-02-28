var test = require('tape')
var camelCase = require('../../lib/utils/camelCase')

test('camelCase on a camelCase string does nothing', function (t) {
  t.plan(1)
  var actual = camelCase('fooBar')
  var expected = 'fooBar'
  t.strictEqual(actual, expected)
})

test('camelCase on a hyphenated string', function (t) {
  t.plan(1)
  var actual = camelCase('foo-bar')
  var expected = 'fooBar'
  t.strictEqual(actual, expected)
})

test('camelCase on a hyphenated string with initial hyphen', function (t) {
  t.plan(1)
  var actual = camelCase('-foo-bar')
  var expected = 'fooBar'
  t.strictEqual(actual, expected)
})

test('with an ms vendor prefix', function (t) {
  t.plan(1)
  var actual = camelCase('-ms-animation')
  var expected = 'msAnimation'
  t.strictEqual(actual, expected)
})
