function mapValues (source, fn) {
  var destination = {}

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = fn(source[key])
    }
  }

  return destination
}

module.exports = mapValues
