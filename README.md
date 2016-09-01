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

There are also **mixins** available for convenience, giving you a clean API and animation support:

```javascript
// inside componentWillMount
var faux = this.connectFauxDOM('div','chart');
d3.doingAnAdvancedAnimationFor3secs(faux);
this.animateFauxDOM(3500); // duration + margin

// inside render
return {this.state.chart};
```

ReactFauxDOM supports a wide range of DOM operations and will fool most libraries but it isn't exhaustive (the full DOM API is ludicrously large). It supports enough to work with D3 but will require you to fork and add to the project if you encounter something that's missing.

You can think of this as a bare bones [jsdom][] that's built to bridge the gap between the declarative React and the imperative JavaScript world. We just need to expand it as we go along since jsdom is a huge project that solves different problems.

I'm trying to keep it light so as not to slow down your render function. I want efficient, declarative and stateless code, but I don't want to throw away previous tools to get there.

## Installation

You can install the package `react-faux-dom` from npm as you usually would. Then use webpack or browserify (etc) to bundle the source into your build. If you need a pre-built UMD version you can use [unpkg][].

You can find the latest version of the UMD version at https://unpkg.com/react-faux-dom/dist/ReactFauxDOM.min.js

## Usage

 * Full [documentation][] with current DOM API coverage
 * [An example static chart ][lab-chart] ([source][lab-chart-source])
 * [An example animated chart using the mixin][mixin-example] 
 * [A simple example using state and events][lab-state] ([source][lab-state-source])
 * [d3-react-sparkline][], a small component I built at [Qubit][]
 * [component-kit][], "UI-Kit for Rapidly Creating Dashboards"

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
[lab-chart]: http://lab.oli.me.uk/d3-to-react-again/
[lab-chart-source]: https://github.com/Olical/lab/blob/gh-pages/js/d3-to-react-again/main.js
[lab-state]: http://lab.oli.me.uk/react-faux-dom-state/
[lab-state-source]: https://github.com/Olical/lab/blob/gh-pages/js/react-faux-dom-state/main.js
[d3-react-sparkline]: https://github.com/QubitProducts/d3-react-sparkline
[qubit]: http://www.qubit.com/
[documentation]: ./DOCUMENTATION.md
[react-motion]: https://github.com/chenglou/react-motion
[mixin-example]: ./examples/animate-d3-with-mixin
[component-kit]: https://github.com/kennetpostigo/component-kit
[unpkg]: https://unpkg.com/