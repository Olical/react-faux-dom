import React from 'react'
import sinon from 'sinon'
import './configure'
import { shallow } from 'enzyme'
import withFauxDOM from '../../lib/withFauxDOM'

function Component (noinit) {
  class MockComponent extends React.Component {
    constructor (props) {
      super(props)
      this.setState = this.setState.bind(this)
    }

    render () {
      return <div>Fake Component</div>
    }
  }
  var comp = shallow(React.createElement(withFauxDOM(MockComponent)))
  var instance = comp.instance()
  instance.setState = sinon.spy()
  noinit || instance.componentWillMount()
  return instance
}

export default Component
