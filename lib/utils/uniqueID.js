var index = 0

// This is of course not using UUIDs, but should be totally sufficient
// for our use case
function uniqueID () {
  return 'faux-dom-' + (index++)
}

module.exports = uniqueID
