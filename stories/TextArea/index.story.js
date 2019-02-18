import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  table,
  importExample,
  columns,
  liveCode as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

const liveCode = config =>
  baseCode({
    components: { ...baseScope },
    ...config,
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  sections: [
    columns({
      items: [
        description({
          text:
            'A snippet to achieve text area used to allow for extended user input.',
        }),
        description(),
      ],
    }),

    columns({
      items: [
        table({
          title: 'Included Components',
          rows: [
            [
              <LinkTo
                kind="Components"
                story="FormField"
              >{`<FormField/>`}</LinkTo>,
              'Layout component for form elements',
            ],
            [
              <LinkTo
                kind="Components"
                story="InputArea"
              >{`<InputArea/>`}</LinkTo>,
              'Component that receives data',
            ],
          ],
        }),
        description(),
      ],
    }),

    columns({
      items: [importExample({ source: examples.importExample }), description()],
    }),

    description({
      text: '## Examples',
    }),

    columns({
      items: [
        description({
          title: 'Basic Example',
          text: 'The most basic example.',
        }),
        liveCode({ compact: true, source: examples.basicExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'No Label',
          text: 'Can be used without a label.',
        }),
        liveCode({ compact: true, source: examples.withoutALabelExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Fixed Height',
          text:
            'Size of an input area can be fixed. The scrollbar appears for text view.',
        }),
        liveCode({ compact: true, source: examples.fixedHeightExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Dynamic Height',
          text:
            'The resizeable prop defines if an input is resizable by the user.',
        }),
        liveCode({ compact: true, source: examples.resizableHeightExample }),
      ],
    }),
  ],
};
