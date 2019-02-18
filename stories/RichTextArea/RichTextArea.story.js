import React from 'react';
import {
  description,
  table,
  importExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';

import { baseScope } from '../utils/Components/LiveCodeExample';
import RichTextArea from '../../src/RichTextArea';
import * as examples from './examples';

export const settings = {
  category: '3. Inputs',
  storyName: '3.2b + RichTextArea', // TODO: Ask Domas
  dataHook: 'storybook-richtextarea',
};

// TODO: Reuse the code below inside a general "StoryPage" component
const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), code({ source })],
  });

export default {
  category: settings.category,
  storyName: settings.storyName,
  // component: RichTextArea,
  // componentPath: '../../src/RichTextArea',
  // componentProps: setProps => ({
  //   value: '',
  //   resizable: false,
  //   error: false,
  //   dataHook: settings.dataHook,
  //   onChange: value => {
  //     setProps({ value });
  //   },
  // }),
  // exampleProps: {
  //   onChange: value => value,
  // },
  sections: [
    description({
      text: `
RichTextArea is an input for rich text`, // TODO: Ask for a description
    }),
    table({
      title: 'Included Components',
      rows: [
        [
          <LinkTo kind="Components" story="FormField">{`<FormField/>`}</LinkTo>,
          'Layout component for form elements',
        ],
        [
          // TODO: Fix link
          <LinkTo
            kind="Components"
            story="3.2b + RichTextArea"
          >{`<RichTextArea/>`}</LinkTo>,
          'Component that receives rich data',
        ],
      ],
    }),
    importExample({
      source: examples.importExample,
    }),
    description({ text: '## Examples' }),
    ...[
      {
        title: 'Composition with FormField',
        text: 'Text Input supports 3 sizes',
        source: examples.composition,
      },
    ].map(example),
  ],
};
