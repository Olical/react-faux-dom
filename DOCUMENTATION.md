This library allows you to instantiate a fairly lightweight object that behaves (sort of) like a regular DOM element from your browser. It does not support the whole DOM API, you'll probably want [jsdom][] for that. Instead, it supports a subset which was initially just enough to satisfy [D3][] but this can be expanded easily as desired. Things like jQuery and Backbone can also be used, it just may require some up front tweaking.

Why do this though? This allows us to take a stateful library that mutates DOM structures, such as D3, and make it entirely stateless. From there we can render our charts and other such DOM trees into React components without dropping out of the component life cycle. This is even more important with the introduction of stateless components (which are just simple functions!), you no longer want to be messing around with life cycle hooks, we should just be returning React DOM structures.

The best documentation will always be the source and tests, but I will try to give you an overview of usage and the high level API below.

## Usage

### Creating elements

You can create an element by instantiating `ReactFauxDOM.Element` like so.

```javascript
import ReactFauxDOM from 'react-faux-dom'
const someDiv = new ReactFauxDOM.Element('div')
```

### Children

If you don't want to call things like `appendChild` then you can instantiate an element as a child of another by passing the parent as the second argument to the constructor.

```javascript
const paragraph = new ReactFauxDOM.Element('p', someDiv)
paragraph.appendChild(someFauxDOMElement)
paragraph.appendChild(someReactElement)
```

As you can see, you can embed React components into the faux DOM seamlessly. Mutating those children obviously won't work, but it allows you to optimise your rendering significantly.

### Manipulating

You can pass these elements to things like D3 and then use that library as you normally would. All they do is call the underlying DOM manipulation methods I have implemented so far like this.

```javascript
paragraph.textContent = 'Hello, World!'
paragraph.style = 'color:red'
```

### To React!

Obviously this little DOM like data structure can't actually be rendered, that's why you have to call `toReact` on it. This will return a regular React element for you to return from your render function or nestle alongside other React elements and components.

```javascript
render () {
  return (
    <div>
      {paragraph.toReact()}
    </div>
  )
}
```

## DOM support

### `ReactFauxDOM` (document)

 * `defaultView`
 * `createElement`
 * `compareDocumentPosition` - Always returns 8, for selector engines

### `ReactFauxDOM.Window`

 * `getComputedStyle` - Just uses `el.style.getProperty`

### `ReactFauxDOM.Element`

* `style.setProperty`
* `style.getProperty`
* `style.getPropertyValue`
* `style.removeProperty`
* `style.* = '...'`
* `style = '...'`
* `setAttribute`
* `getAttribute`
* `getAttributeNode`
* `removeAttribute`
* `addEventListener`
* `removeEventListener`
* `appendChild`
* `insertBefore`
* `removeChild`
* `querySelector`
* `querySelectorAll`
* `getElementsByTagName`
* `getElementById`
* `nextSibling`
* `previousSibling`
* `innerHTML`
* `textContent`
* `getBoundingClientRect`

[jsdom]: https://github.com/tmpvar/jsdom
[d3]: http://d3js.org/

## React Higher-Order Component (HOC)

You also have access to an **higher-order component** which makes it easy to render faux nodes, and to animate them while they're being mutated by a DOM library like for example D3.

To use it, simply import it with `import {withFauxDOM} from 'react-faux-dom'` or require it with `var withFauxDOM = require('react-faux-dom').withFauxDOM`, and then apply it to your component with `withFauxDOM(MyComponent)`.

The `withFauxDOM()` HOC passes the following methods to your component via props:

* **`connectFauxDOM(node, name)`**: This will store the `node` element and make it available via `this.props[name]`. It also makes an asynchronous call to `drawFauxDOM`. The node can be a faux element or a string, in which case a faux element is instantiated. The node is returned for convenience. A component can have multiple connected nodes. If the node already exists, it will be reused by default. If you need to force a new node, use the form `connectFauxDOM(node, name, discardNode)` setting the optional third argument `discardNode` to `true`.
* **`drawFauxDOM()`**: This will update the component props (causing a render) with virtual DOM (through `node.toReact()`) for all previously `connect`ed faux nodes. Each node's representation will be on `this.props[name]`, where `name` is the one used in the `connect` call.
* **`animateFauxDOM(duration)`**: This will make a call to `drawFauxDOM` every 16 milliseconds until the duration has expired.
* **`stopAnimatingFauxDOM()`**: Cancels eventual ongoing animation
* **`isAnimatingFauxDOM()`**: Returns true or false depending on whether an animation is ongoing.

The HOC will also take care of the necessary setup and teardown. To see it in action, check out the `animate-d3-with-hoc` and `update-d3-with-hoc` mini-apps in the `examples` folder.
