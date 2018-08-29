# `<TableActionCell/>` component

## Enzyme/ReactTestUtils TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getPrimaryActionPlaceholder | (index) | element | Get the primary action placeholder element |
| getPrimaryActionButtonDriver | (index) | ButtonDriver | Get the driver of the primary action `<Button/>` from the action column |
| clickPrimaryActionButton | (index) | - | Click the primary action button from the action column |
| getVisibleActionsCount | (index) | number | Get the number of the visible secondary actions |
| getHiddenActionsCount | (index) | number | Get the number of the hidden secondary actions (in the `<PopoverMenu/>`) |
| getVisibleActionTooltipDriver | (rowIndex, actionIndex) | TooltipDriver | Get the driver of a specific visible secondary action `<Tooltip/>` |
| getVisibleActionButtonDriver | (rowIndex, actionIndex) | ButtonDriver | Get the driver of a specific visible secondary action `<Button/>` |
| getHiddenActionsPopoverMenuDriver | (rowIndex) | PopoverMenuDriver | Get the driver of the hidden secondary action `<PopoverMenu/>` |
| clickVisibleAction | (rowIndex, actionIndex) | - | Click an a visible secondary action |
| clickPopoverMenu | (rowIndex) | - | Click on the hidden secondary actions `<PopoverMenu/>` |
| clickHiddenAction | (rowIndex, actionIndex) | - | Click on a hidden secondary action (requires the `<PopoverMenu/>` to be open) |

## Protractor TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getPrimaryActionPlaceholder | (index) | element | Get the primary action placeholder element |
| getPrimaryActionButton | (index) | element | Get the primary action button element |
| getVisibleActionsWrapper | (index) | element | Get the visible secondary actions wrapper element |
| getHiddenActionsPopoverMenu | (index) | element | Get the secondary actions popover menu element |
