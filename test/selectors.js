var test = require('tape')
var mk = require('./test-utils/mk')

function getListNode () {
  var el = mk()
  var list = el.append('ul')
  list.append('li')
  list.append('li')
  list.append('li')
  return el.node()
}

test('selecting an element', function (t) {
  t.plan(1)
  var node = getListNode()
  var actual = node.querySelector('ul').nodeName
  var expected = 'ul'
  t.strictEqual(actual, expected)
})

test('selecting a missing element', function (t) {
  t.plan(1)
  var node = getListNode()
  var actual = node.querySelector('nope')
  var expected = null
  t.strictEqual(actual, expected)
})

test('selecting an element with all', function (t) {
  t.plan(2)
  var node = getListNode()
  var res = node.querySelectorAll('ul')
  t.strictEqual(res[0].nodeName, 'ul')
  t.strictEqual(res.length, 1)
})

test('selecting elements with all', function (t) {
  t.plan(2)
  var node = getListNode()
  var res = node.querySelectorAll('li')
  t.strictEqual(res[0].nodeName, 'li')
  t.strictEqual(res.length, 3)
})

test('selecting missing elements with all', function (t) {
  t.plan(2)
  var node = getListNode()
  var res = node.querySelectorAll('nope')
  t.ok(res instanceof Array)
  t.strictEqual(res.length, 0)
})

test('selecting one with no argument throws', function (t) {
  t.plan(1)
  var node = getListNode()
  t.throws(function () {
    node.querySelector()
  }, /Not enough arguments/)
})

test('selecting many with no argument throws', function (t) {
  t.plan(1)
  var node = getListNode()
  t.throws(function () {
    node.querySelectorAll()
  }, /Not enough arguments/)
})
