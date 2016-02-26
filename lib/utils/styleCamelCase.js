var camelCase = require('./camelCase')

function styleCamelCase (name) {
  var camel = camelCase(name)

  // Detect if the style property is already camelCased
  // To not convert Webkit*, Moz* and O* to lowercase
  if (camel.charAt(0).toUpperCase() === name.charAt(0)) {
    return name.charAt(0) + camel.slice(1)
  }

  if (name.charAt(0) === '-') {
    return camel.indexOf('ms') === 0 ? camel
      : camel.charAt(0).toUpperCase() + camel.slice(1)
  } else {
    return camel
  }
}

module.exports = styleCamelCase
