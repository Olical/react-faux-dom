var test = require('tape')
var mk = require('./utils/mk')

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
  el.append('p')
  el.append('p').attr('key', 'testing')
  el.append('p').attr('foo', 'bar')

  var tree = el.node().toReact()

  t.plan(5)
  t.equal(tree.key, 'faux-dom-0')
  t.equal(tree.props.children[0].key, 'faux-dom-0')
  t.equal(tree.props.children[1].key, 'testing')
  t.equal(tree.props.children[2].key, 'faux-dom-2')
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
  t.equal(tree.props.children[0].props.foo, 'bar')
})
