import React from 'react';
import Text from 'wix-style-react/Text';
import {SIZES, SKINS, WEIGHTS} from '../../src/Text/Text';

import CodeExample from 'wix-storybook-utils/CodeExample';

import TypographyExample from './ExampleTextTypography';
import TypographyExampleRaw from '!raw-loader!./ExampleTextTypography';

import MultilineExample from './ExampleMultiline';
import MultilineExampleRaw from '!raw-loader!./ExampleMultiline';

import EllipsisExample from './ExampleEllipsis';
import EllipsisExampleRaw from '!raw-loader!./ExampleEllipsis';

export default {
  category: '1. Foundation',
  storyName: '1.2 Text',
  component: Text,
  componentPath: '../../src/Text/Text.js',

  componentProps: {
    children: 'Some text',
    light: false,
    dataHook: 'storybook-text',
    size: SIZES.medium,
    secondary: false,
    skin: SKINS.standard,
    weight: WEIGHTS.normal,
    tagName: 'span'
  },

  examples: (
    <div>
      <CodeExample title="Multiline Example" code={MultilineExampleRaw}>
        <MultilineExample/>
      </CodeExample>

      <CodeExample title="Ellipsis Example" code={EllipsisExampleRaw}>
        <EllipsisExample/>
      </CodeExample>

      <CodeExample title="Typography Examples" code={TypographyExampleRaw}>
        <TypographyExample/>
      </CodeExample>
    </div>
  )
};

