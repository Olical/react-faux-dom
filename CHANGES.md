# react-faux-dom changes

## v2.7.0

 * Merge [#52](https://github.com/Olical/react-faux-dom/pull/52#issuecomment-230895972) - Add support for `getBoundingClientRect`, thanks to [@alexyuly](https://github.com/alexyuly)!

## v2.6.2

 * REALLY fix `package.json`, just realised I don't need to publish to test this :(

Sorry about v2.6.{0,1,2}, my bad.

## v2.6.1

 * Fix `package.json` files array by removing it. Trying to get `dist` in npm.

## v2.6.0

 * Merge [#53](https://github.com/Olical/react-faux-dom/pull/53) (just my approach to [#48](https://github.com/Olical/react-faux-dom/pull/48)) - Provide a UMD build in a CDN.

## v2.5.0

 * Merge [#41](https://github.com/Olical/react-faux-dom/pull/41) - Adding mixin with animation support (thanks [@krawaller](https://github.com/krawaller)!)

## v2.4.0

 * Merge [#37](https://github.com/Olical/react-faux-dom/pull/37) - Replace lodash dependencies with in house functions
 * Throw when `querySelector(All)` does not receive an argument
 * Return null when `querySelector` does not find a match

## v2.3.0

 * Merge [#38](https://github.com/Olical/react-faux-dom/pull/38) - Fix vendor prefixes for already camelCased style names

## v2.2.0

 * Merge [#35](https://github.com/Olical/react-faux-dom/pull/35) - Define `childNodes` in `Element`
 * Some small README improvements

## v2.1.1

 * Merge [#26](https://github.com/Olical/react-faux-dom/pull/26) - Documentation
 * Merge [#27](https://github.com/Olical/react-faux-dom/pull/27) - Cache some RegExps and make a section of code more DRY

## v2.1.0

 * Merge [#23](https://github.com/Olical/react-faux-dom/pull/23) - Support data and aria attributes
 * Merge [#25](https://github.com/Olical/react-faux-dom/pull/25) which fixes [#19](https://github.com/Olical/react-faux-dom/issues/19) - On click not passing through D3 datum

## v2.0.1

 * Fix [#10](https://github.com/Olical/react-faux-dom/issues/10) - Vendor prefixed styles are camel cased incorrectly

## v2.0.0

 * Fix [#9](https://github.com/Olical/react-faux-dom/issues/9) - Make events work like the normal DOM

This should contribute to fixing [#4](https://github.com/Olical/react-faux-dom/issues/4) (Support for Brush) too. The reason that this is a breaking change (a major version bump) is that the event object you receive in event listeners is now the actual native event, not a React synthetic event. If you want the synthetic event use the `syntheticEvent` property. This should help even more d3 code just work out of the box.

## v1.1.0

 * Fix [#7](https://github.com/Olical/react-faux-dom/issues/7) - toReact mutates the faux element
