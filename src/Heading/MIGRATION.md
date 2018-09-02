# Heading Migration Guide

## Migration to version 5
We have updated the appearance ((they way the text looks) of all headings and also extended the appearance values with new ones.
Possible `appearance` values are now:  `H1`, `H2`, `H3`, `H4`, `H5`, `H6`.
>NOTICE: some appearance values have been moved, for instance H2 should now be H3. (See the following table)
Check the storybook documentation to see the typography each appearance provide.

### `appearance` values migration
`appearance` prop values have changed. Old values have a mapping to new values, and 2 new values have been added (H2, H4).

The mapping is as follows:

| version 4 | version 5 |
| -------- | --------- |
| H1 | H1 |
| - | H2 (new)|
| H2 | H3 |
| - | H4 (new)|
| H3 | H5 |
| H4 | H6 |

Meaning that a `<Heading appearance="H2"/>` from version 4 should be transformed to `<Heading appearance="H3"/>` when using version 5.

## Migration to version 3

Instead of having many appearance H.* indexes, we have a new component `Heading` which also uses the `light` prop which helps us define the desired typography.
We used to have a lot of options. All H0 - H4 values are now relevant only for the Heading component.
We used to have `H0` - `H4`, which got mapped under the hood to html `h1` - `h5` respectively. Instead of doing it, we now support only `H1` - `H4` which will be mapped to `h1` - `h4`.

### Appearances updates
`<Text appearance="H0">` -> DEPRECATED

`<Text appearance="H1">` -> `<Heading appearance="H1">`

`<Text appearance="H1.1">` -> `<Heading appearance="H1" light>`

`<Text appearance="H2">` -> `<Heading appearance="H2">`

`<Text appearance="H2.1">` -> `<Heading appearance="H2" light>`

`<Text appearance="H3">` -> `<Heading appearance="H3">`

`<Text appearance="H4">` -> `<Heading appearance="H4">`

