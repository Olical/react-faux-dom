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
  el.append('p').text('one')
  el.append('p').text('two')
  el.append('p').text('three')

  var tree = el.node().toReact()

  t.plan(4)
  t.equal(tree.type, 'div')
  t.equal(tree.props.children.length, 3)
  t.equal(tree.props.children[1].type, 'p')
  t.equal(tree.props.children[1].props.children, 'two')
})

test('auto default keys', function (t) {
  var el = mk()
  // 0
  el.append('p')
  // 1
  var sub = el.append('p').attr('key', 'testing')
  // 1.0
  sub.append('p')
  // 2
  el.append('p').attr('foo', 'bar')

  var tree = el.node().toReact('test')

  t.plan(6)
  t.equal(tree.key, 'test')
  t.notEqual(tree.props.children[0].key, undefined)
  t.equal(tree.props.children[1].key, 'testing')
  t.equal(tree.props.children[1].props.children._key, undefined)
  t.notEqual(tree.props.children[2].key, undefined)
  t.equal(tree.props.children[2].props.foo, 'bar')
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
