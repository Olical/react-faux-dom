# react-faux-dom [![npm version](https://badge.fury.io/js/react-faux-dom.svg)](http://badge.fury.io/js/react-faux-dom) [![Build Status](https://travis-ci.org/Olical/react-faux-dom.svg?branch=master)](https://travis-ci.org/Olical/react-faux-dom) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

[![Join the chat at https://gitter.im/Olical/react-faux-dom](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Olical/react-faux-dom?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

DOM like data structure to be mutated by [D3][] et al, then rendered to [React][] elements.

```javascript
// Create your element.
var el = ReactFauxDOM.createElement('div')

// Change stuff using actual DOM functions.
// Even perform CSS selections.
el.style.setProperty('color', 'red')
el.setAttribute('class', 'box')

// Render it to React elements.
return el.toReact()

// Yields: <div style='color: red;' className='box'></div>
```

It supports a wide range of DOM operations and will fool most libraries but it isn't exhaustive (the full DOM API is ludicrously large). It supports enough to work with D3 but will require you to fork and add to the project if you encounter something that's missing.

You can think of this as a bare bones [jsdom][] that's built to bridge the gap between the declarative React and the imperative JavaScript world. We just need to expand it as we go along since jsdom is a huge project that solves different problems.

I'm trying to keep it light so as not to slow down your render function. I want efficient, declarative and stateless code.

## Usage

Here's a simple example using D3, you can find a more complex one [in my lab][lab-post] ([source][lab-source]) or [d3-react-sparkline][], a small component I built at [Qubit][].

```javascript
var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Graph = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.number)
  },
  render: function () {
    // This is where we create the faux DOM node and give it to D3.
    var chart = d3.select(ReactFauxDOM.createElement('div'))

    chart
      .selectAll('.bar') // Yes, CSS selectors work.
      .data(this.props.data)
      .enter().append('div')
      .classed('bar', true)
      .style('width', function (d, i) {
        // Use styles exactly as you would with D3.
        // Hyphenated names are camel cased.
        return d * 10
      })
      .text(function (d) {
        return d
      })

    // We ask D3 for the underlying fake node and then render it as React elements.
    return chart.node().toReact()
  }
})

var data = [4, 8, 15, 16, 23, 42]

React.render(
  React.createElement(Graph, {data: data}),
  document.getElementById('mount-chart')
)
```

There's not that much to show, and that's the point. It's just like the DOM, you just create your elements from a different root and call `.toReact()` at the end. Check out [src/Element.js][element] for the current API.

No real DOM nodes were used in the making of this example.

## Development

```bash
# Fetch the dependencies
make bootstrap

# Test
make test

# Test continually
make test-watch
```

## Author

[Oliver Caldwell][author-site] ([@OliverCaldwell][author-twitter])

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[unlicense]: http://unlicense.org/
[author-site]: http://oli.me.uk/
[author-twitter]: https://twitter.com/OliverCaldwell
[d3]: http://d3js.org/
[react]: http://facebook.github.io/react/
[jsdom]: https://github.com/tmpvar/jsdom
[lab-post]: http://lab.oli.me.uk/d3-to-react-again/
[lab-source]: https://github.com/Olical/lab/blob/gh-pages/js/d3-to-react-again/main.js
[d3-react-sparkline]: https://github.com/QubitProducts/d3-react-sparkline
[qubit]: http://www.qubit.com/
[element]: ./src/Element.js
