function compareReactElements (t, first, second) {
  t.equal(first.$$typeof, second.$$typeof)
  t.equal(first._owner, second._owner)
  t.deepEqual(first._store, second._store)
  t.equal(first.key, second.key)
  t.deepEqual(first.props, second.props)
  t.equal(first.type, second.type)
}

module.exports = compareReactElements
