var React = require('react')
var PropTypes = require('prop-types')
var withFauxDOM = require('../../lib/ReactFauxDOM').withFauxDOM
var d3 = require('d3')

class Chart extends React.Component {
  constructor (props) {
    super(props)
    this.renderD3 = this.renderD3.bind(this)
    this.updateD3 = this.updateD3.bind(this)
  }

  componentDidMount () {
    this.renderD3()
  }

  componentDidUpdate (prevProps, prevState) {
    // do not compare props.chart as it gets updated in updateD3()
    if (this.props.data !== prevProps.data) {
      this.updateD3()
    }
  }

  render () {
    return (
      <div>
        {this.props.chart}
      </div>
    )
  }

  renderD3 () {
    var data = this.props.data

    // This will create a faux div and store its virtual DOM in state.chart
    var faux = this.props.connectFauxDOM('div', 'chart')

    /*
       D3 code below by Alan Smith, http://bl.ocks.org/alansmithy/e984477a741bc56db5a5
       The only changes made for this example are...

       1) feeding D3 the faux node created above
       2) calling this.animateFauxDOM(duration) after each animation kickoff
       3) move data generation and button code to parent component
       4) data and title provided as props by parent component
       5) reattach to faux dom for updates
       6) move rejoining of data and chart updates to updateD3()
    */

    var xBuffer = 50
    var yBuffer = 150
    var lineLength = 400

    var svgDoc = d3.select(faux).append('svg')

    svgDoc.append('text')
      .attr('x', xBuffer + (lineLength / 2))
      .attr('y', 50)
      .text(this.props.title)

    // create axis line
    svgDoc.append('line')
      .attr('x1', xBuffer)
      .attr('y1', yBuffer)
      .attr('x1', xBuffer + lineLength)
      .attr('y2', yBuffer)

    // create basic circles
    svgDoc.append('g').selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d, i) {
        var spacing = lineLength / data.length
        return xBuffer + (i * spacing)
      })
      .attr('cy', yBuffer)
      .attr('r', function (d, i) { return d })
  }

  updateD3 () {
    var data = this.props.data

    /* code below from Alan Smith except changes mentioned previously */

    var xBuffer = 50
    var yBuffer = 150
    var lineLength = 400

    // reattach to faux dom
    var faux = this.props.connectFauxDOM('div', 'chart')
    var svgDoc = d3.select(faux).select('svg')

    // rejoin data
    var circle = svgDoc.select('g').selectAll('circle')
      .data(data)

    circle.exit().remove() // remove unneeded circles
    circle.enter().append('circle')
      .attr('r', 0) // create any new circles needed

    // update all circles to new positions
    circle.transition()
      .duration(500)
      .attr('cx', function (d, i) {
        var spacing = lineLength / data.length
        return xBuffer + (i * spacing)
      })
      .attr('cy', yBuffer)
      .attr('r', function (d, i) { return d })

    this.props.animateFauxDOM(800)

    d3.select('text').text(this.props.title)
  }
}

Chart.defaultProps = {
  chart: 'loading...'
}

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired
}

const FauxChart = withFauxDOM(Chart)

module.exports = FauxChart
