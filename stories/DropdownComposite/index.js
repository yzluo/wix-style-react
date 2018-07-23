import React from 'react';
import { storiesOf } from '@storybook/react';
import InteractiveCodeExample from 'wix-storybook-utils/InteractiveCodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../../src/DropdownComposite/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('4. Selection', module).add('4.1 + DropdownComposite', () => (
  <div>
    <Markdown source={Readme} />

    <InteractiveCodeExample title="Customize a <DropdownComposite/>">
      <ExampleStandard />
    </InteractiveCodeExample>
  </div>
));
