# 2.0.1

 * Fix [#10] (vendor prefixed styles not being camel-cased correctly)

# 2.0.0

 * Fix [#9] (make events behave like the real DOM)

This should contribute to fixing [#4] too. The reason that this is a breaking change (a major version bump) is that the event object you receive in event listeners is now the actual native event, not a React synthetic event. If you want the synthetic event use the `syntheticEvent` property. This should help even more d3 code just work out of the box.

# 1.1.0

 * Fix [#7] (`.toReact()` mutating `props.style`)
