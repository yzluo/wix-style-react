# `<Card/>`

A generic container component for any content.

Most often used as compound of `<Card.Header/>` and `<Card.Content/>`.

Use [`<Grid/>`](https://wix-wix-style-react.surge.sh/?selectedKind=Common&selectedStory=Grid&full=0&addons=0&stories=1&panelRight=0) component to layout content inside `<Card.Content/>`


```js
import Card from 'wix-style-react/Card';

export default () =>
  <Card>
    <Card.Header title="Catchy Header"/>

    <Card.Content>
      Anything goes
    </Card.Content>
  </Card>
```

| propName          | propType | defaultValue | isRequired | description                                              |
| ---               | ---      | ---          | ---        | ---                                                      |
| stretchVertically | bool     | false        | -          | Should this Card stretch vertically inside the container |

---

Compound components:

<details>
  <summary>`Card.Header`</summary>

  | propName       | propType | defaultValue | isRequired | description                    |
  | ---            | ---      | ---          | ---        | ---                            |
  | title          | string   | -            | +          | The title of the card          |
  | subtitle       | string   | -            | -          | The subtitle of the card       |
  | withoutDivider | bool     | false        | -          | Whether to show divider or not |
</details>

<details>
  <summary>`Card.ButtonHeader`</summary>

  | propName       | propType | defaultValue | isRequired | description                                  |
  | ---            | ---      | ---          | ---        | ---                                          |
  | title          | string   | -            | +          | The title of the card                        |
  | subtitle       | string   | -            | -          | The subtitle of the card                     |
  | buttonTitle    | string   | -            | +          | The text to write on the button              |
  | buttonOnClick  | func     | -            | +          | The onClick function                         |
  | buttonPrefix   | node     | -            | -          | An optional Icon to put before the button    |
  | buttonSuffix   | node     | -            | -          | An optional Icon to put after the button     |
  | tooltip        | node     | -            | -          | If set, this tooltip will wrap the button    |
  | theme          | string   | 'standard'   | -          | Can be 'standard', 'fullblue' or 'emptyblue' |
  | withoutDivider | bool     | false        | -          | Whether to show divider or not               |
</details>

<details>
  <summary>`Card.LinkHeader`</summary>

  | propName       | propType | defaultValue | isRequired | description                             |
  | ---            | ---      | ---          | ---        | ---                                     |
  | title          | string   | -            | +          | The title of the card                   |
  | subtitle       | string   | -            | -          | The subtitle of the card                |
  | linkTo         | string   | -            | +          | The link to send the user to            |
  | linkTitle      | string   | -            | +          | The link text                           |
  | tooltip        | node     | -            | -          | If set, this tooltip will wrap the link |
  | withoutDivider | bool     | false        | -          | Whether to show divider or not          |
</details>

<details>
  <summary>`Card.CollapsedHeader`</summary>

  | propName                | propType            | defaultValue | isRequired | description                             |
  | ---                     | ---                 | ---          | ---        | ---                                     |
  | title                   | string              | -            | +          | The title of the card                   |
  | subtitle                | string              | -            | -          | The subtitle of the card                |
  | toggleSwitch            | 'button' / 'switch' | 'switch'     | -          | The style of the collapsed card toggle  |
  | withoutDivider          | bool                | false        | -          | Whether to show divider or not          |
  | collapsed               | bool                | false        | -          | True when the card should be collapsed  |
  | onCollapsedChange       | func                | -            | -          | Called with collapse status on change   |
  | controlled <sup>*</sup> | bool                | false        | -          | Converts the component to be controlled |

  > * When `controlled` is true, `collapsed` will change only via `collapsed` prop.
</details>

---
