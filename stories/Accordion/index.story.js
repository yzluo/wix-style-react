import React from 'react';
import {storySettings} from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import Accordion from '../../src/Accordion';
import InfoCircle from "../../src/new-icons/InfoCircle";

const exampleData = [
  {
    label: 'Simple data',
    value: [{
      title: 'title',
      icon: <InfoCircle/>,
      content: (
        <div>
          lauren ipsum lauren ipsum lauren ipsum lauren ipsum lauren ipsum
          lauren ipsum lauren ipsum lauren ipsum{' '}
        </div>
      ),
    },
      {
        title: 'title1',
        icon: <InfoCircle/>,
        content: 'dummy content',
      }],
  }
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Accordion,
  componentPath: '../../src/Accordion/Accordion.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    data: exampleData[0].value,
  },

  exampleProps: {
    data: exampleData
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{maxWidth: 627}}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={`
          <Accordion
            dataHook="story-accordion-live-example"
            />
        `}
      />
    </div>
  ),
};
