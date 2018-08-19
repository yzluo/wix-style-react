import React from 'react';
import {storiesOf} from '@storybook/react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import StructureExample from './StructureExample';
import StructureExampleRaw from '!raw-loader!./StructureExample';


storiesOf('1. Foundation', module)
  .add('App Structure', () => (
    <CodeExample
      title="App Structure"
      code={StructureExampleRaw}
      children={<StructureExample/>}
    />
  ));
