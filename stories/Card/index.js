import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import CardReadme from '../../src/Card/README.md';

import ExampleBasic from './ExampleBasic';
import ExampleBasicRaw from '!raw-loader!./ExampleBasic';

import ExampleGridActionHeaders from './ExampleActionHeaders';
import ExampleGridActionHeadersRaw from '!raw-loader!./ExampleActionHeaders';

import ExampleCollapsableHeaders from './ExampleCollapsableHeaders';
import ExampleCollapsableHeadersRaw from '!raw-loader!./ExampleCollapsableHeaders';

storiesOf('2. Layout', module)
  .add('Card', () => (
    <div>
      <Markdown source={CardReadme}/>

      <CodeExample title="Basic Example" code={ExampleBasicRaw}>
        <ExampleBasic/>
      </CodeExample>

      <CodeExample title="Cards with action headers" code={ExampleGridActionHeadersRaw}>
        <ExampleGridActionHeaders/>
      </CodeExample>

      <CodeExample title="Cards with collapsed header" code={ExampleCollapsableHeadersRaw}>
        <ExampleCollapsableHeaders/>
      </CodeExample>
    </div>
  ));
