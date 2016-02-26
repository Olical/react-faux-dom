var hyphenExpression = /\-+([a-z])/gi

function upperCaseFirstMatch (match, c, offset) {
  if (offset !== 0) {
    return c.toUpperCase()
  } else {
    return c
  }
}

function camelCase (str) {
  var camelCased = str.replace(hyphenExpression, upperCaseFirstMatch)
  hyphenExpression.lastIndex = 0
  return camelCased
}

module.exports = camelCase
