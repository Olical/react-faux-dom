function assign (dest) {
  var args = arguments
  var source

  for (var i = 1; i < args.length; i++) {
    source = args[i]

    for (var key in source) {
      dest[key] = source[key]
    }
  }

  return dest
}

module.exports = assign
