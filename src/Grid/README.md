# Grid

A grid is a collection of `<Container/>`, `<Row/>` and `<Col/>` components that help laying out
content with ease.

`<Container/>` is based on `<Row/>`s with 12 `<Col/>`umns layout.

All components except for `<Container/>` can be nested.

```js
import {Container, Row, Col} from 'wix-style-react/Grid';

export default () =>
  <Container>
    <Row>
      <Col>Left</Col>
      <Col>Middle</Col>
      <Col>Right</Col>
    </Row>
  </Container>;
```

<details>
  <summary>Nested grid example</summary>

  ```js
  import {Container, Row, Col} from 'wix-style-react/Grid';

  export default () =>
    <Container>
      <Row>
        <Col>Left</Col>

        <Col>
          <Row>
            <Col span={6}>Nested left</Col>
            <Col span={6}>Nested right</Col>
          </Row>
        </Col>

        <Col>Right</Col>
      </Row>
    </Container>;
  ```
</details>

---

<details>
  <summary>`<Container/>`</summary>

  Use as wrapper for main content. Only `<Row/>`s should be its children.

  It has `minWidth: 894px` and `maxWidth: 1254px`.
</details>


<details>
  <summary>`<Row/>`</summary>

  Use as wrapper for columns. Only `<Col/>`s should be its children.

  One `<Row/>` should not have more than 12 `<Col/>`s.
</details>

<details>
  <summary>`<Col/>`</summary>

  Use for any content, works great with [`<Card/>`](https://wix-wix-style-react.surge.sh/?selectedKind=Common&selectedStory=Card&full=0&addons=0&stories=1&panelRight=0) as children.

  | propName               | propType | defaultValue | isRequired | description                                    |
  | ---                    | ---      | ---          | ---        | ---                                            |
  | rtl                    | bool     | -            | -          | Reverses the columns ordering                  |
  | stretchViewsVertically | bool     | -            | -          | Make all the views in that raw the same height |
</details>

<details>
  <summary>`<AutoAdjustedColumns/>`</summary>

  A row of columns with as many columns as children with the same width.
  Can be used for multiple (not more than 12) equal cards on the same row.
  If you want that the children will be the at the same height, 
  just add height: 100%; to them (if there isn't already).
  if its a card just add the stretchVertically prop.

  > Note that the span of each element will be `12 % {children.length}`, so in case of result greater than 0, you'll get incomplete line
</details>


<details>
  <summary>`<Col/>`</summary>

  A simple column according to the bootstrap docs

  | propName | propType | defaultValue | isRequired | description                       |
  | ---      | ---      | ---          | ---        | ---                               |
  | span     | number   | -            | +          | The columns span of this column   |
  | rtl      | bool     | -            | -          | Causing the column to float right |
</details>

