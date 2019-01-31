## SegmentedToggle

| propName        | propType | defaultValue | isRequired | description                                                                                                                   |
| --------------- | -------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| children        | node     | -            | -          | any nodes to render inside SegmentedToggle. Ideally should be one of `<SegmentedToggle.Button/>` or `<SegmentedToggle.Icon/>` |
| defaultSelected | string   | -            | -          | sets default selected toggle                                                                                                  |
| onClick         | func     | -            | -          | returns selected element and value `(evt, value)`                                                                             |
| disabled        | bool     | false        | -          | applies disabled styles                                                                                                       |

## SegmentedToggle.Icon

| propName    | propType | defaultValue | isRequired | description                                                            |
| ----------- | -------- | ------------ | ---------- | ---------------------------------------------------------------------- |
| children    | node     | -            | -          | any node to render inside. Ideally should be icon from wix-style-react |
| tooltipText | string   | -            | -          | textual content for tooltip                                            |
| value       | string   | -            | -          | hook for parent container to control selection                         |

## SegmentedToggle.Button

| propName   | propType | defaultValue | isRequired | description                                         |
| ---------- | -------- | ------------ | ---------- | --------------------------------------------------- |
| children   | node     | -            | -          | any node to render inside. Ideally should be string |
| prefixIcon | node     | -            | -          | element based icon (svg, image etc.)                |
| value      | string   | -            | -          | hook for parent container to control selection      |
