import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import NoBorderInput from '../../src/MaterialInput';
import {
  Standard,
  Error,
  Controlled,
  Sizes,
  InstanceMethods,
  Loader,
  Affix,
  IconAffix,
} from '../Input/examples';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: NoBorderInput,
  componentPath: '../../src/MaterialInput/NoBorderInput.js',

  componentProps: setState => ({
    dataHook: storySettings.dataHook,
    value: '',
    onChange: e => setState({ value: e.target.value }),
    size: 'normal',
    statusMessage: undefined,
  }),

  exampleProps: {
    status: [
      { label: 'Input.StatusError', value: 'error' },
      { label: 'Input.StatusLoading', value: 'loading' },
    ],
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="No border input standard example"
        initialCode={`
          <MaterialInput
            dataHook="story-material-input-live-example"
            placeholder="this is a placeholder"
          />
        `}
      />
      <Standard />
      {/*<Error />*/}
      {/*<Loader />*/}
      {/*<Affix />*/}
      {/*<IconAffix />*/}
      {/*<Controlled />*/}
      {/*<Sizes />*/}
      {/*<InstanceMethods />*/}
    </div>
  ),
};
