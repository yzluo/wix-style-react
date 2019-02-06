import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import NumberInput from '../../src/NumberInput';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: NumberInput,
  componentPath: '../../src/NumberInput/NumberInput.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    buttonText: undefined,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={`
<NumberInput
  dataHook="story-number-input-live-example"
  buttonText="Press me for a surprise"
  />
        `}
      />
    </div>
  ),
};
