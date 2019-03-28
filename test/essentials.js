import test from 'tape'
import ReactFauxDOM from '..'
import Element from '../lib/Element'

test('has a create method', function (t) {
  t.plan(1)
  t.equal(typeof ReactFauxDOM.createElement, 'function')
})

test('creates an element instance with a nodeName', function (t) {
  t.plan(2)
  var el = ReactFauxDOM.createElement('div')
  t.ok(el instanceof ReactFauxDOM.Element)
  t.equal(el.nodeName, 'div')
})

test('hyphenated properties are camel cased', function (t) {
  var el = ReactFauxDOM.createElement('div')
  el.setAttribute('text-align', 'right')
  t.plan(3)
  t.equal(el.getAttribute('text-align'), 'right')
  t.equal(el.getAttribute('textAlign'), 'right')
  t.equal(el.toReact().props.textAlign, 'right')
})

test('children and childNodes behave properly', function (t) {
  var parentEl = ReactFauxDOM.createElement('div')
  var el = ReactFauxDOM.createElement('div')
  var elReact = ReactFauxDOM.createElement('div').toReact()
  var textNode = ReactFauxDOM.createElement('TextElement')
  textNode.nodeType = 3

  parentEl.appendChild(el)
  parentEl.appendChild(elReact)
  parentEl.appendChild(textNode)

  t.plan(5)
  t.equal(parentEl.childNodes.length, 3)
  t.equal(parentEl.children.length, 2)

  t.ok(parentEl.childNodes[0] instanceof Element)
  t.equal(parentEl.childNodes[1].type, el.nodeName)
  t.equal(parentEl.childNodes[2].nodeType, 3)
})

test('cloneNode', function (t) {
  var parentEl = ReactFauxDOM.createElement('div')
  var el = ReactFauxDOM.createElement('div')
  var elReact = ReactFauxDOM.createElement('div').toReact()
  var textNode = ReactFauxDOM.createElement('TextElement')
  textNode.nodeType = 3

  parentEl.style.setProperty('width', '100px')
  parentEl.style.setProperty('height', '200px')
  parentEl.setAttribute('data-foo', 'foo')
  parentEl.appendChild(el)
  parentEl.appendChild(elReact)
  parentEl.appendChild(textNode)

  var cloneParentEl = parentEl.cloneNode()

  t.plan(9)
  t.equal(cloneParentEl.getAttribute('data-foo'), 'foo')
  t.equal(cloneParentEl.style.getProperty('width'), '100px')
  t.equal(cloneParentEl.style.getProperty('height'), '200px')
  t.equal(cloneParentEl.nodeName, 'div')
  t.equal(cloneParentEl.children.length, 2)
  t.equal(cloneParentEl.childNodes.length, 3)

  t.ok(cloneParentEl.childNodes[0] instanceof Element)
  t.equal(cloneParentEl.childNodes[1].type, el.nodeName)
  t.equal(cloneParentEl.childNodes[2].nodeType, 3)
})

test.only('compareDocumentPosition', function (t) {
  var parentEl = ReactFauxDOM.createElement('div')
  var siblingOne = ReactFauxDOM.createElement('div')
  var siblingTwo = ReactFauxDOM.createElement('div')
  parentEl.appendChild(siblingOne)
  parentEl.appendChild(siblingTwo)

  t.plan(2)
  t.equal(parentEl.compareDocumentPosition(siblingOne), Element.DOCUMENT_POSITION_CONTAINS)
  t.equal(siblingOne.compareDocumentPosition(siblingTwo), Element.DOCUMENT_POSITION_PRECEDING)
})
