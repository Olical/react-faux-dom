# Documentation

This library allows you to instantiate a fairly lightweight object that behaves (sort of) like a regular DOM element from your browser. It does not support the whole DOM API, you'll probably want [jsdom][] for that. Instead, it supports a subset which was initially just enough to satisfy [D3][] but this can be expanded easily as desired. Things like jQuery and Backbone can also be used, it just may require some up front tweaking.

Why do this though? This allows us to take a stateful library that mutates DOM structures, such as D3, and make it entirely stateless. From there we can render our charts and other such DOM trees into React components without dropping out of the component life cycle. This is even more important with the introduction of stateless components (which are just simple functions!), you no longer want to be messing around with life cycle hooks, we should just be returning React DOM structures.

## Usage

### Creating elements

You can create an element by instantiating `ReactFauxDOM.Element` like so.

```javascript
var ReactFauxDOM = require('react-faux-dom')
var someDiv = new ReactFauxDOM.Element('div')
```

### Children

If you don't want to call things like `appendChild` then you can instantiate an element as a child of another by passing the parent as the second argument to the constructor.

```javascript
var paragraph = new ReactFauxDOM.Element('p', someDiv)
```

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

[jsdom]:
[d3]: