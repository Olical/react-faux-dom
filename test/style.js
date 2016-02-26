var test = require('tape')
var mk = require('./test-utils/mk')

test('simple style string sets the property', function (t) {
  var el = mk().node()
  el.setAttribute('style', 'color:red')
  t.plan(1)
  t.equal(el.style.color, 'red')
})

test('setting a complex style string', function (t) {
  var el = mk().node()
  el.setAttribute('style', 'color: red; height: 300px; width: 200px; text-align: left')
  t.plan(4)
  t.equal(el.style.color, 'red')
  t.equal(el.style.height, '300px')
  t.equal(el.style.width, '200px')
  t.equal(el.style.textAlign, 'left')
})

test('setting a property appears in React', function (t) {
  var el = mk().node()
  el.style.backgroundColor = 'red'
  var r = el.toReact()
  t.plan(1)
  t.equal(r.props.style.backgroundColor, 'red')
})

test('style object methods do not leak through', function (t) {
  var el = mk().node()
  el.style.backgroundColor = 'red'
  var r = el.toReact()
  t.plan(3)
  t.equal(typeof r.props.style.setProperty, 'undefined')
  t.equal(typeof r.props.style.getProperty, 'undefined')
  t.equal(typeof r.props.style.removeProperty, 'undefined')
})

test('when using a key the style object is still cleaned', function (t) {
  var el = mk().node()
  el.setAttribute('key', 'test')
  el.style.backgroundColor = 'red'
  var r = el.toReact()
  t.plan(3)
  t.equal(typeof r.props.style.setProperty, 'undefined')
  t.equal(typeof r.props.style.getProperty, 'undefined')
  t.equal(typeof r.props.style.removeProperty, 'undefined')
})

test('vendor prefixed styles are correctly camel-cased', function (t) {
  var el = mk().node()
  el.setAttribute('style', '-webkit-transition: opacity 100ms ease')
  t.plan(1)
  t.equal(el.style.WebkitTransition, 'opacity 100ms ease')
})

test('pascal-cased, vendor prefixed styles are not camel-cased', function (t) {
  var el = mk().node()
  el.setAttribute('style', 'WebkitTransition: opacity 100ms ease')
  t.plan(1)
  t.equal(el.style.WebkitTransition, 'opacity 100ms ease')
})

test('-ms- and ms* vendor prefixed styles are supported', function (t) {
  t.plan(2)
  var el = mk().node()
  el.setAttribute('style', 'msTransform: opacity 100ms ease; -ms-animation: 1s ease popIn')
  t.equal(el.style.msTransform, 'opacity 100ms ease')
  t.equal(el.style.msAnimation, '1s ease popIn')
})
