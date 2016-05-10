var React = require('react')
var ReactDOM = require('react-dom')
var Faux = require('../../lib/ReactFauxDOM')
var d3 = require('d3')

var Chart = React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    return { look: 'stacked' }
  },
  render: function () {
    return <div>
      <button onClick={this.toggle}>Toggle</button>
      {this.state.chart}
    </div>
  },
  toggle: function () {
    if (this.state.look === 'stacked') {
      this.setState({ look: 'grouped' })
      this.transitionGrouped()
    } else {
      this.setState({ look: 'stacked' })
      this.transitionStacked()
    }
  },
  componentDidMount: function () {
    // This will create a faux div and store its virtual DOM
    // in state.chart
    var faux = this.connectFauxDOM('div', 'chart')

    var component = this

    /*
       D3 code below by Mike Bostock, https://bl.ocks.org/mbostock/3943967
       The only changes made for this example are...

       1) feeding D3 the faux node created above
       2) calling this.animateFauxDOM(duration) after each animation kickoff
       3) attaching the radio button callbacks to the component
       4) deleting the radio button (as we do the toggling through the react button)

    */

    var n = 4 // number of layers
    var m = 58 // number of samples per layer
    var stack = d3.layout.stack()
    var layers = stack(d3.range(n).map(function () { return bumpLayer(m, 0.1) }))
    var yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y }) })
    var yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y0 + d.y }) })

    var margin = {top: 40, right: 10, bottom: 20, left: 10}
    var width = 960 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom

    var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], 0.08)

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0])

    var color = d3.scale.linear()
        .domain([0, n - 1])
        .range(['#aad', '#556'])

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .orient('bottom')

    var svg = d3.select(faux).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var layer = svg.selectAll('.layer')
        .data(layers)
      .enter().append('g')
        .attr('class', 'layer')
        .style('fill', function (d, i) { return color(i) })

    var rect = layer.selectAll('rect')
        .data(function (d) { return d })
      .enter().append('rect')
        .attr('x', function (d) { return x(d.x) })
        .attr('y', height)
        .attr('width', x.rangeBand())
        .attr('height', 0)

    rect.transition()
        .delay(function (d, i) { return i * 10 })
        .attr('y', function (d) { return y(d.y0 + d.y) })
        .attr('height', function (d) { return y(d.y0) - y(d.y0 + d.y) })

    this.animateFauxDOM(800)

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

    this.transitionGrouped = function () {
      y.domain([0, yGroupMax])

      rect.transition()
          .duration(500)
          .delay(function (d, i) { return i * 10 })
          .attr('x', function (d, i, j) { return x(d.x) + x.rangeBand() / n * j })
          .attr('width', x.rangeBand() / n)
        .transition()
          .attr('y', function (d) { return y(d.y) })
          .attr('height', function (d) { return height - y(d.y) })

      component.animateFauxDOM(2000)
    }

    this.transitionStacked = function () {
      y.domain([0, yStackMax])

      rect.transition()
          .duration(500)
          .delay(function (d, i) { return i * 10 })
          .attr('y', function (d) { return y(d.y0 + d.y) })
          .attr('height', function (d) { return y(d.y0) - y(d.y0 + d.y) })
        .transition()
          .attr('x', function (d) { return x(d.x) })
          .attr('width', x.rangeBand())

      component.animateFauxDOM(2000)
    }

    // Inspired by Lee Byron's test data generator.
    function bumpLayer (n, o) {
      function bump (a) {
        var x = 1 / (0.1 + Math.random())
        var y = 2 * Math.random() - 0.5
        var z = 10 / (0.1 + Math.random())
        for (var i = 0; i < n; i++) {
          var w = (i / n - y) * z
          a[i] += x * Math.exp(-w * w)
        }
      }

      var a = []
      var i
      for (i = 0; i < n; ++i) a[i] = o + o * Math.random()
      for (i = 0; i < 5; ++i) bump(a)
      return a.map(function (d, i) { return {x: i, y: Math.max(0, d)} })
    }
  }
})

ReactDOM.render(<Chart/>, document.getElementById('container'))
