# 2.1.1

 * Merge [#26](https://github.com/Olical/react-faux-dom/pull/26) - Documentation
 * Merge [#27](https://github.com/Olical/react-faux-dom/pull/27) - Cache some RegExps and make a section of code more DRY

# 2.1.0

 * Merge [#23](https://github.com/Olical/react-faux-dom/pull/23) - Support data and aria attributes
 * Merge [#25](https://github.com/Olical/react-faux-dom/pull/25) which fixes [#19](https://github.com/Olical/react-faux-dom/issues/19) - On click not passing through D3 datum

# 2.0.1

 * Fix [#10](https://github.com/Olical/react-faux-dom/issues/10) - Vendor prefixed styles are camel cased incorrectly

# 2.0.0

 * Fix [#9](https://github.com/Olical/react-faux-dom/issues/9) - Make events work like the normal DOM

This should contribute to fixing [#4](https://github.com/Olical/react-faux-dom/issues/4) (Support for Brush) too. The reason that this is a breaking change (a major version bump) is that the event object you receive in event listeners is now the actual native event, not a React synthetic event. If you want the synthetic event use the `syntheticEvent` property. This should help even more d3 code just work out of the box.

# 1.1.0

 * Fix [#7](https://github.com/Olical/react-faux-dom/issues/7) - toReact mutates the faux element
