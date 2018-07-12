import * as React from 'react';
import {ExampleTSComp} from '../../src/ExampleTSComp';
import {storySettings} from './storySettings';

export default {
  category: '14. Internal',
  storyName: '14.1 Typescript Test',

  component: ExampleTSComp,
  componentPath: '../../src/ExampleTSComp',
  componentProps: {
    'data-hook': storySettings.dataHook,
    name: <span>erez</span>
  }

};
