import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import Accordion from '../../src/Accordion';
import InfoCircle from '../../src/new-icons/InfoCircle';

const exampleData = [
  {
    label: 'Simple data',
    value: [
      {
        title: 'First Item',
        icon: <InfoCircle />,
        expandLabel: 'More',
        collapseLabel: 'Less',
        content: (
          <div>
            lauren ipsum lauren ipsum lauren ipsum lauren ipsum lauren ipsum
            lauren ipsum lauren ipsum lauren ipsum
          </div>
        ),
      },
      {
        title: 'Second Item',
        icon: <InfoCircle />,
        expandLabel: 'More',
        collapseLabel: 'Less',
        content: 'dummy content',
      },
    ],
  },
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
    data: exampleData,
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Card with Accordion"
        initialCode={`
          <Card>
            <Card.Header title="Example Card with Accordion"/>
            <Accordion
              dataHook="story-accordion-live-example"
              data={
                [
                  {
                    title: 'First Item',
                    icon: <InfoCircle />,
                    expandLabel: 'More',
                    collapseLabel: 'Less',
                    content: (
                      <div>
                        lauren ipsum lauren ipsum lauren ipsum lauren ipsum lauren ipsum
                        lauren ipsum lauren ipsum lauren ipsum
                      </div>
                    ),
                  }
                ]
              }
              />
          </Card>
        `}
      />
    </div>
  ),
};
