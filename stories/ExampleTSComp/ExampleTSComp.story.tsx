import * as React from 'react';
import {ExampleTSComp} from '../../src/ExampleTSComp';
import {storySettings} from './storySettings';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: ExampleTSComp,
  componentPath: '../../src/ExampleTSComp',
  componentProps: {
    'dataHook': storySettings.dataHook,
    name: <span>erez</span>
  }

};
