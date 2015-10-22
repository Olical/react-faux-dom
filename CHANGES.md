# 2.0.1

 * Fix [#10](https://github.com/Olical/react-faux-dom/issues/10) - Vendor prefixed styles are camel cased incorrectly

# 2.0.0

 * Fix [#9](https://github.com/Olical/react-faux-dom/issues/9) - Make events work like the normal DOM

This should contribute to fixing [#4](https://github.com/Olical/react-faux-dom/issues/4) (Support for Brush) too. The reason that this is a breaking change (a major version bump) is that the event object you receive in event listeners is now the actual native event, not a React synthetic event. If you want the synthetic event use the `syntheticEvent` property. This should help even more d3 code just work out of the box.

# 1.1.0

 * Fix [#7](https://github.com/Olical/react-faux-dom/issues/7) - toReact mutates the faux element
