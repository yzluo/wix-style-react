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
          text: 'To edit multiline text.',
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
      title: 'Examples',
    }),

    columns({
      items: [
        description({
          title: 'Basic Example',
          text: 'The most basic example',
        }),
        liveCode({ compact: true, source: examples.basicExample }),
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
          text: 'Size of an input area can also expand by user drag.',
        }),
        liveCode({ compact: true, source: examples.resizableHeightExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Without a label',
          text: 'Text Area can also be used without FormField label',
        }),
        liveCode({ compact: true, source: examples.withoutALabelExample }),
      ],
    }),
  ],
};
