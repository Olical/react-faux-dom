import test from 'tape'
import mk from './test-utils/mk'

test('modify properties', function (t) {
  var el = mk()
    .attr('width', 100)
    .attr('height', 200)
    .node()

  t.plan(2)
  t.equal(el.getAttribute('width'), 100)
  t.equal(el.getAttribute('height'), 200)
})

test('append children', function (t) {
  var el = mk()

  el
    .append('p')
    .attr('foo', 'bar')

  el = el.node()

  t.plan(3)
  t.equal(el.children.length, 1)
  t.equal(el.children[0].getAttribute('foo'), 'bar')
  t.equal(el.children[0].parentNode, el)
})

test('classes', function (t) {
  var el = mk()
    .classed('foo bar baz', true)
    .classed('bar', false)
    .node()

  t.plan(1)
  t.equal(el.props.className, 'foo baz')
})

test('html', function (t) {
  var el = mk()
    .html('Hello, World!')
    .node()

  t.plan(1)
  t.equal(el.text, 'Hello, World!')
})

test('some event support', function (t) {
  var el = mk()
    .on('mouseover', function () {})
    .node()

  t.plan(1)
  t.equal(typeof el.eventListeners.onMouseOver[0], 'function')
})

test('next/previousSibling (used by order?)', function (t) {
  var el = mk()
  var first = el.append('p').node()
  var second = el.append('p').node()

  t.plan(2)
  t.equal(first.nextSibling, second)
  t.equal(second.previousSibling, first)
})

test('removing a child', function (t) {
  var el = mk()
  var p = el.append('p')
  p.remove()
  el = el.node()

  t.plan(1)
  t.equal(el.children.length, 0)
})

test('styles', function (t) {
  var el = mk()
    .style('stroke-width', '2px')
    .style('opacity', 0.5)

  t.plan(4)
  var styles = el.node().props.style
  t.equal(styles.strokeWidth, '2px')
  t.equal(styles.opacity, 0.5)
  t.equal(el.style('stroke-width'), '2px')
  t.equal(el.style('width'), '')
})

test('text', function (t) {
  var el = mk()
    .text('Hello, World!')
    .node()

  t.plan(1)
  t.equal(el.text, 'Hello, World!')
})

test('selection by class', function (t) {
  var el = mk()

  el.append('p').classed('one', true)
  var two = el.append('p').classed('two', true).node()
  el.append('p').classed('three', true)

  var match = el.select('.two').node()

  t.plan(1)
  t.equal(match, two)
})

test('selection by id', function (t) {
  var el = mk()
  var original = el.append('div').append('p').attr('id', 'find-me').node()
  var selected = el.select('#find-me').node()

  t.plan(1)
  t.equal(selected, original)
})

test('insert before', function (t) {
  var el = mk()
  el.append('p')
  var span = el.insert('span', 'p').node()

  el = el.node()

  t.plan(1)
  t.equal(el.children[0], span)
})

test('NS methods behave the same', function (t) {
  var el = mk()
    .attr('xlink:href', 'localhost')
    .node()

  t.plan(1)
  t.equal(el.getAttributeNS('xlink', 'href'), 'localhost')
})

test('.enter() weirdness from https://github.com/Olical/react-faux-dom/issues/135', function (t) {
  var el = mk()
  var calledWith = 'not called'

  el
    .selectAll('.node')
    .data([10])
    .enter()
    .append('circle')
    .attr('r', d => (calledWith = d))

  t.plan(1)
  t.equal(calledWith, 10)
})

test('cloneNode', function (t) {
  var el = mk()

  el
    .append('div')
    .html('Hello!')
    .style('width', '100px')
    .attr('data-foo', '1234')
    .clone()
    .html('World!')
    .style('width', '200px')
    .attr('data-foo', '4321')

  var node = el.node()

  t.plan(7)
  t.equal(node.children.length, 2)
  t.equal(node.children[0].text, 'Hello!')
  t.equal(node.children[1].text, 'World!')
  t.equal(node.children[0].style.width, '100px')
  t.equal(node.children[1].style.width, '200px')
  t.equal(node.children[0].props['data-foo'], '1234')
  t.equal(node.children[1].props['data-foo'], '4321')
})
