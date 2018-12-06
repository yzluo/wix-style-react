import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import Counter from '../../src/Counter';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Counter,
  componentPath: '../../src/Counter/Counter.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    incrementText: 'Inc',
    decrementText: 'Dec',
  },

  exampleProps: {
    onCountUpdate: newCount => `Called with new count: ${newCount}`,
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={`
<Counter
  initialCount={100}
  onCountUpdate={newCount => console.log(newCount)}
  theme="fullgreen"
  />
        `}
      />
    </div>
  ),
};
