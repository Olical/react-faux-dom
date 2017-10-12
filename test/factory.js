import test from 'tape'
import factory from '../lib/factory'

test('factory creates Element classes with different ownerDocuments', function (t) {
  const od1 = factory().Element.prototype.ownerDocument
  const od2 = factory().Element.prototype.ownerDocument
  t.plan(1)
  t.notEqual(od1, od2)
})

test('factory creates rfds with different windows', function (t) {
  const win1 = factory().defaultView
  const win2 = factory().defaultView
  t.plan(1)
  t.notEqual(win1, win2)
})
