# react-faux-dom changes

## v4.2.0

 * Merge [#133](https://github.com/Olical/react-faux-dom/pull/133) - Clean up HOC timers on unmount.

## v4.1.0

 * Merge [#123](https://github.com/Olical/react-faux-dom/pull/123) - Expose drawFauxDOM in HOC.
 * Merge [#116](https://github.com/Olical/react-faux-dom/pull/116) - Support independent documents with a factory.

## v4.0.5

 * Merge [#115](https://github.com/Olical/react-faux-dom/pull/115) - Update a bunch of things.

## v4.0.4

 * Merge [#114](https://github.com/Olical/react-faux-dom/pull/114) - Move React to dev dependencies.

## v4.0.3

This should have been v4.0.0 really, I sincerely apologise for breaking the previous three releases.

 * Merge [#102](https://github.com/Olical/react-faux-dom/pull/102) - Redesign and fix the withFauxDOM HOC.

withFauxDOM now passes the methods you need through the props. The documentation has been updated. For reasoning, see [#96](https://github.com/Olical/react-faux-dom/issues/96).

## v4.0.2 - broken

Same as v4.0.1 but under the normal `latest` tag.

 * Merge [#100](https://github.com/Olical/react-faux-dom/pull/100) - Change the `withFauxDOM` HOC so it only uses ES5 features. Fixes issues around uglifyjs after the v4.0.0 release.

## v4.0.1 (under `next` tag) - broken

Pre-release to confirm [#100](https://github.com/Olical/react-faux-dom/pull/100) works as expected.

## v4.0.0 - broken

 * Merge [#91](https://github.com/Olical/react-faux-dom/pull/91) - Replace mixins with higher order components.
 * Merge [#88](https://github.com/Olical/react-faux-dom/pull/88) - Add CDNJS version to README.md.
 * Merge [#89](https://github.com/Olical/react-faux-dom/pull/89) - Add option to discard the existing node in connectFauxDom.
 * Merge [#95](https://github.com/Olical/react-faux-dom/pull/95) - Alias style.getPropertyValue to style.getProperty, D3 requires it now.
 * Commit [1c3a9ee](https://github.com/Olical/react-faux-dom/commit/1c3a9ee872ccddca49efd8a24b4f419c24da199b) - Only set the parentNode on faux DOM nodes, not React nodes.

## v3.1.0

 * Revert [#75](https://github.com/Olical/react-faux-dom/issues/75). It caused issues in some cases.
 * Merge [#85](https://github.com/Olical/react-faux-dom/pull/85) - Reuse the DOM in updates when using the mixin.

## v3.0.1

 * Fix builds, as reported by [#81](https://github.com/Olical/react-faux-dom/issues/81) - It used to use a tool I built, bastion, but npm@3+ broke that. Uses webpack directly now.
 * Add a bind where there could be potential issues. Fixes [#75](https://github.com/Olical/react-faux-dom/issues/75).
 * Merge [#65](https://github.com/Olical/react-faux-dom/pull/65) - Documentation improvements.

## v3.0.0

 * Merge [#69](https://github.com/Olical/react-faux-dom/pull/69) - Return an empty string from style getters by default. From issue [#68](https://github.com/Olical/react-faux-dom/issues/68).
 * Merge [#71](https://github.com/Olical/react-faux-dom/pull/71) - Changes npmcdn URLs to unpkg. Not sure why they're doing this but oh well.

Breaking change because of the following:

 * The default return type of the style functions have changed from `undefined` to `string`.
 * The unpkg build (previously npmcdn) exports to the global `ReactFauxDOM` instead of `react-faux-dom`.

## v2.7.1

 * Merge [#59](https://github.com/Olical/react-faux-dom/pull/59) - Updates D3 to v4 (a `devDependency`) and makes sure the tests work fine.

## v2.7.0

 * Merge [#52](https://github.com/Olical/react-faux-dom/pull/52) - Add support for `getBoundingClientRect`, thanks to [@alexyuly](https://github.com/alexyuly)!

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
