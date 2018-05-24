# react-faux-dom [![npm version](https://badge.fury.io/js/react-faux-dom.svg)](http://badge.fury.io/js/react-faux-dom) [![CDNJS](https://img.shields.io/cdnjs/v/react-faux-dom.svg)](https://cdnjs.com/libraries/react-faux-dom) [![Build Status](https://travis-ci.org/Olical/react-faux-dom.svg?branch=master)](https://travis-ci.org/Olical/react-faux-dom) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) [![Join the chat at https://gitter.im/Olical/react-faux-dom](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Olical/react-faux-dom?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

DOM like data structure to be mutated by [D3][] et al, then rendered to [React][] elements.

ReactFauxDOM supports a wide range of DOM operations and will fool most libraries but it isn't exhaustive (the full DOM API is ludicrously large). It supports enough to work with D3 but will require you to fork and add to the project if you encounter something that's missing.

You can think of this as a bare bones [jsdom][] that's built to bridge the gap between the declarative React and the imperative JavaScript world. We just need to expand it as we go along since jsdom is a huge project that solves different problems.

I'm trying to keep it light so as not to slow down your render function. I want efficient, declarative and stateless code, but I don't want to throw away previous tools to get there.

## Example

### Default

This style of calling `createElement` and `toReact` is the default API, it's easy to use and fits into the normal React flow but won't allow you to perform animations or D3 force layouts, for example.

```javascript
class SomeChart extends React.Component {
  render () {
    // Create your element.
    var el = ReactFauxDOM.createElement('div')

    // Change stuff using actual DOM functions.
    // Even perform CSS selections!
    el.style.setProperty('color', 'red')
    el.setAttribute('class', 'box')

    // Render it to React elements.
    return el.toReact()
  }
}

// Yields: <div style='color: red;' class='box'></div>
```

### With animation helper

Complex usage with [D3][], ES6 modules and animations. Clone it from [here][minimal-example-source], or try on in [codesandbox][minimal-example-sandbox].

```javascript
import React from 'react'
import * as d3 from 'd3'
import {withFauxDOM} from 'react-faux-dom'

class MyReactComponent extends React.Component {
  componentDidMount () {
    const faux = this.props.connectFauxDOM('div', 'chart')
    d3.select(faux)
      .append('div')
      .html('Hello World!')
    this.props.animateFauxDOM(800)
  }

  render () {
    return (
      <div>
        <h2>Here is some fancy data:</h2>
        <div className='renderedD3'>
          {this.props.chart}
        </div>
      </div>
    )
  }
}

MyReactComponent.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(MyReactComponent)
```

## Limitations

This library is intended to be used to build a React DOM tree from some mutable intermediate value which is then thrown away inside a `render` function. This means things that require mutation of the DOM, such as D3's animations, zooming, dragging and brushing will not work.

Static charts will work fine out of the box, you can use this tool to translate SVG tools into DOM managed by React easily. If you wish to start adding in animations you'll have to use the `withFauxDOM` higher order component mentioned above and in a few of the examples.

Before you go to use this tool, stop and think:

 * Am I trying to build static DOM within a render method? - This is fine.
 * Am I trying to hook up timers and event listeners with a 3rd party tool to manipulate some DOM after I have inserted it into the page? - This is not going to work.

## Installation

You can install the package `react-faux-dom` from npm as you usually would. Then use webpack or browserify (etc) to bundle the source into your build. If you need a pre-built UMD version you can use [unpkg][].

You can find the latest version of the UMD version at https://unpkg.com/react-faux-dom/dist/ReactFauxDOM.min.js

### Independent documents

By default all Elements share an emulated `window` at 
`el.ownerDocument.defaultView` you can create independent documents with:

```javascript
import React from 'react'
import rfdFactory from 'react-faux-dom/lib/factory'

function getParagraph() {
  const ReactFauxDOM = rfdFactory();
  return new ReactFauxDOM.Element('p', someDiv);
}

const p1 = getParagraph();
const p2 = getParagraph();

assert(p1.ownerDocument !== p2.ownerDocument);
```

### More usage info:

 * Full [documentation][] with current DOM API coverage
 * An example static chart ([source][lab-chart-source], [article][lab-chart])
 * An "hello world" example using the HOC ([source][minimal-example-source], [sandbox][minimal-example-sandbox])
 * An example animated chart using the HOC ([source][hoc-animate-example], [sandbox][hoc-animate-sandbox])
 * An example chart with D3 updates using the HOC ([source][hoc-update-example], [sandbox][hoc-update-sandbox])
 * A simple example using state and events ([source][lab-state-source], [article][lab-state])
 * A d3 sankey diagram builder ([source][sankey-app-source], [demo][sankey-app])
 * `d3-react-sparkline`, a small component I built at [Qubit][] ([source][d3-react-sparkline])
 * `component-kit`, "UI-Kit for Rapidly Creating Dashboards" ([source][component-kit])
 * A demo dashboard with multiple charts ([source][rd3-source], [demo][rd3-demo])

### Related articles:

 * [D3 within React the right way][Olical-post]
 * [React + D3.js: Balancing Performance & Developer Experience][tibotiber-post]
 * [A starting point on using D3 with React][AdilBaaj-post]

## Development

```bash
# Fetch the dependencies
make bootstrap

# Test
make test

# Test continually
make test-watch
```

## Maintainers

This project is actively maintained by the following developers. Feel free to reach out if you'd like to join us and help out!

 * [@Olical](https://github.com/Olical)
 * [@tibotiber](https://github.com/tibotiber)

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[unlicense]: http://unlicense.org/
[d3]: http://d3js.org/
[react]: http://facebook.github.io/react/
[jsdom]: https://github.com/tmpvar/jsdom
[lab-chart]: http://lab.oli.me.uk/d3-to-react-again/
[lab-chart-source]: https://github.com/Olical/lab/blob/gh-pages/js/d3-to-react-again/main.js
[lab-state]: http://lab.oli.me.uk/react-faux-dom-state/
[lab-state-source]: https://github.com/Olical/lab/blob/gh-pages/js/react-faux-dom-state/main.js
[d3-react-sparkline]: https://github.com/QubitProducts/d3-react-sparkline
[qubit]: http://www.qubit.com/
[documentation]: ./DOCUMENTATION.md
[react-motion]: https://github.com/chenglou/react-motion
[sankey-app]: http://nick.balestra.ch/sankey/
[sankey-app-source]: https://github.com/nickbalestra/sankey
[hoc-animate-example]: https://github.com/tibotiber/rfd-animate-example
[hoc-animate-sandbox]: https://codesandbox.io/s/github/tibotiber/rfd-animate-example/tree/master/
[hoc-update-example]: https://github.com/tibotiber/rfd-update-example
[hoc-update-sandbox]: https://codesandbox.io/s/github/tibotiber/rfd-update-example/tree/master/
[component-kit]: https://github.com/kennetpostigo/component-kit
[unpkg]: https://unpkg.com/
[Olical-post]: http://oli.me.uk/2015/09/09/d3-within-react-the-right-way/
[tibotiber-post]: https://medium.com/@tibotiber/react-d3-js-balancing-performance-developer-experience-4da35f912484
[rd3-demo]: https://rd3.now.sh
[rd3-source]: https://github.com/tibotiber/rd3
[AdilBaaj-post]: https://blog.sicara.com/a-starting-point-on-using-d3-with-react-869fdf3dfaf
[minimal-example-source]: https://github.com/tibotiber/rfd-min-example
[minimal-example-sandbox]: https://codesandbox.io/s/github/tibotiber/rfd-min-example/tree/master/
