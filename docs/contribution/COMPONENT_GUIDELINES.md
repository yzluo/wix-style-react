# Component guidelines

## UX Specification

Components are designed according to [Zeplin](https://app.zeplin.io/project/5864e02695b5754a69f56150) design created by UX guild.

## Naming

A component will be named with a `CamelCase` convention.

## Structure

Every component folder should be a single component.

## API (Props)

### Mandatory Props

| Prop Rule | Description |
|--------|-----------|
| *dataHook*| Every component should accept a `dataHook` property which is applied as a `data-hook` attribute on the component's root element. This attribute is use as a selector in tests. A component can extend `WixComponent` in order to be a pure component and have the `dataHook` prop applied automatically.
| *className* | The convension for allowing styling of the component's root element is by exposing a `className` property.

### Props Guidelines

| Prop Rule | Description |
|--------|-----------|
| *initialPropName*| props which set an initial value to an identical uncontrolled state, should be named with an `initial` prefix. [Read More About Controlled & Uncontrolled Components](./CONTROLLED_VS_UNCONTROLLED.md)
| *xxxProps*| If the component is wrapping another component (or native DOM element) and its props is needed - pass it with the convention of xxxProps. for example inputProps tooltipProps, etc..

## Typography

1. For common typography, components should use the `Text` or `Heading` components.
1. In some cases where you can not use a component, you can use the `typography-helpers.scss` file directly.

## Documentation

1. Add `propTypes` to each component and document each property with a `/** */` comment on above. (AutoDocs will make use of it)

[Read here](./DOCUMENTING_COMPONENTS.md)
