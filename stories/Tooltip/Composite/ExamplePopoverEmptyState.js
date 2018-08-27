import React from 'react';

import Tooltip from 'wix-style-react/Tooltip';
import Button from 'wix-style-react/Button';
import EmptyState from 'wix-style-react/EmptyState';

const ExamplePopoverEmptyState = () => (
  <Tooltip
    content={(
      <EmptyState
        title="You don't have labels yet"
        subtitle="Once you create some labels you'll see a list in here"
        />
    )}
    hideTrigger="click"
    placement="right"
    padding={24}
    minWidth={300}
    shouldCloseOnClickOutside
    showTrigger="click"
    dataHook="popover-empty-state"
    >
    <Button>
      Click Me
    </Button>
  </Tooltip>
);

export default ExamplePopoverEmptyState;

