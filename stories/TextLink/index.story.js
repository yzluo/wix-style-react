import React from 'react';

import TextLink from 'wix-style-react/TextLink';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleDark from './ExampleDark';
import ExampleDarkRaw from '!raw-loader!./ExampleDark';

export default {
  category: '5. Buttons',
  storyName: '5.8 Text Link',
  component: TextLink,
  componentPath: '../../src/Backoffice/TextLink',

  componentProps: {
    link: 'https://wix.com',
    underlineStyle: 'hover',
    children: 'Click to visit wix.com',
  },

  example: (
    <div>
      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard />
      </CodeExample>

      <CodeExample title="Dark" code={ExampleDarkRaw}>
        <ExampleDark />
      </CodeExample>
    </div>
  ),
};
