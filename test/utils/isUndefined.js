import test from 'tape'
import isUndefined from '../../lib/utils/isUndefined'

test('not a undefined', function (t) {
  t.plan(1)
  t.notOk(isUndefined(123))
})

test('is a undefined', function (t) {
  t.plan(1)
  t.ok(isUndefined(undefined))
})
