var React = require('react')
var ReactDOM = require('react-dom')
var Chart = require('./Chart')

var App = React.createClass({
  getInitialState: function () {
    return {
      dataArray0: [30, 35, 45, 55, 70],
      dataArray1: [50, 55, 45, 35, 20, 25, 25, 40],
      dataIndex: 0
    }
  },
  render: function () {
    return (
      <div>
        <button onClick={this.changeData}>Change data</button>
        <Chart data={this.state['dataArray' + this.state.dataIndex]} title={'dataset ' + this.state.dataIndex} />
      </div>
    )
  },
  changeData: function () {
    this.setState({
      dataIndex: (this.state.dataIndex + 1) % 2
    })
  }
})

ReactDOM.render(<App />, document.getElementById('container'))
