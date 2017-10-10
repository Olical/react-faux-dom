import ReactFauxDOM from '../..'
import { select } from 'd3'
import 'd3-selection-multi'

function mk () {
  var sel = select(ReactFauxDOM.createElement('div'))
  sel.ownerDocument = ReactFauxDOM
  return sel
}

export default mk
