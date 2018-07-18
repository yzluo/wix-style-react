import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import ControlledTextExampleTypography from './ExampleTextTypography';
import ControlledTextExampleTypographyRaw from '!raw-loader!./ExampleTextTypography';
import Heading from '../../src/Heading';
import Text from 'wix-style-react/Text';
import {SIZES, SKINS, WEIGHTS} from '../../src/Text/Text';

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
      <Heading>Typography Examples:</Heading>
      <CodeExample title="Text" code={ControlledTextExampleTypographyRaw}>
        <ControlledTextExampleTypography/>
      </CodeExample>
    </div>
  )
};

