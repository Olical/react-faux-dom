var test = require('tape')
var mk = require('./test-utils/mk')

test('simple node', function (t) {
  var el = mk().node()
  var tree = el.toReact()

  t.plan(1)
  t.equal(tree.type, 'div')
})

test('nested text', function (t) {
  var el = mk()
  var keys = ['one', 'two', 'three']

  keys.forEach(function (n) {
    el.append('p').attr('key', n).text(n)
  })

  var tree = el.node().toReact()

  t.plan(4)
  t.equal(tree.type, 'div')
  t.equal(tree.props.children.length, 3)
  t.equal(tree.props.children[1].type, 'p')
  t.equal(tree.props.children[1].props.children, 'two')
})

test('pre-built React elements are rendered into the tree', function (t) {
  var el = mk().node()
  var sub = mk()
    .attr('foo', 'bar')
    .node()
    .toReact()

  el.appendChild(sub)
  var tree = el.toReact()

  t.plan(1)
  t.equal(tree.props.children.props.foo, 'bar')
})

test('React elements customize data-* attributes are rendered into the tree', function (t) {
  var el = mk().node()
  var sub = mk()
    .attr('data-foo', 'bar')
    .node()
    .toReact()

  el.appendChild(sub)
  var tree = el.toReact()

  t.plan(1)
  t.equal(tree.props.children.props['data-foo'], 'bar')
})

test('React elements aria-* attributes are rendered into the tree', function (t) {
  var el = mk().node()
  var sub = mk()
    .attr('aria-hidden', 'true')
    .node()
    .toReact()

  el.appendChild(sub)
  var tree = el.toReact()

  t.plan(1)
  t.equal(tree.props.children.props['aria-hidden'], 'true')
})

test('toReact does not mutate the state', function (t) {
  var el = mk().node()
  t.plan(2)
  t.equal(typeof el.props.style.setProperty, 'function')
  el.toReact()
  t.equal(typeof el.props.style.setProperty, 'function')
})

test('React elements have a ref attribute', function (t) {
  var el = mk().node()
  var tree = el.toReact()

  t.plan(4)
  t.equal(typeof tree.ref, 'function')
  t.equal(el.getBoundingClientRect(), undefined)

  var fakeClientRect = {}
  var fakeComponent = {
    getBoundingClientRect: function () {
      return fakeClientRect
    }
  }
  tree.ref(fakeComponent)
  t.equal(el.component, fakeComponent)
  t.equal(el.getBoundingClientRect(), fakeClientRect)
})

test('multiple children require keys', function (t) {
  t.plan(4)
  var el = mk().node()
  var children = ['foo', 'bar', 'baz'].map(function (n) {
    return mk()
      .text(n)
      .attr('key', n)
      .node()
  })

  children.forEach(el.appendChild.bind(el))

  t.ok(el.toReact())

  t.equal(el.childNodes[0].getAttribute('key'), 'foo')
  t.equal(el.childNodes[1].getAttribute('key'), 'bar')
  t.equal(el.childNodes[2].getAttribute('key'), 'baz')
})
