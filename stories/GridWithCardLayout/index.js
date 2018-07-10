import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleGridStandard from './ExampleGridStandard';
import ExampleGridStandardRaw from '!raw-loader!./ExampleGridStandard';

import ExampleRowWithEqualHeight from './ExampleRowWithEqualHeight';
import ExampleRowWithEqualHeightRaw from '!raw-loader!./ExampleRowWithEqualHeight';

import ExampleCollapseableHeaders from './ExampleGridCollapsableHeaders';
import ExampleCollapseableHeadersRaw from '!raw-loader!./ExampleGridCollapsableHeaders';

import ExampleGridRTL from './ExampleGridRTL';
import ExampleGridRTLRaw from '!raw-loader!./ExampleGridRTL';

import ExampleAutoAdjustedRow from './ExampleAutoAdjustedRow';
import ExampleAutoAdjustedRowRaw from '!raw-loader!./ExampleAutoAdjustedRow';

import ExampleGridActionHeaders from './ExampleGridActionHeaders';
import ExampleGridActionHeadersRaw from '!raw-loader!./ExampleGridActionHeaders';

import ExampleOutsideGrid from './ExampleOutsideGrid';
import ExampleOutsideGridRaw from '!raw-loader!./ExampleOutsideGrid';

import GridReadme from '../../src/Grid/README.md';
import CardReadme from '../../src/Card/README.md';

storiesOf('2. Layout', module)
  .add('Grid', () => (
    <div>
      <Markdown source={GridReadme}/>

      <CodeExample title="Grid with card layout" code={ExampleGridStandardRaw}>
        <ExampleGridStandard/>
      </CodeExample>

      <CodeExample title="Cards with action headers" code={ExampleGridActionHeadersRaw}>
        <ExampleGridActionHeaders/>
      </CodeExample>

      <CodeExample title="Grid with equal height columns" code={ExampleRowWithEqualHeightRaw}>
        <ExampleRowWithEqualHeight/>
      </CodeExample>

      <CodeExample title="Grid with auto adjusted columns" code={ExampleAutoAdjustedRowRaw}>
        <ExampleAutoAdjustedRow/>
      </CodeExample>

      <CodeExample title="Cards with collapsed header" code={ExampleCollapseableHeadersRaw}>
        <ExampleCollapseableHeaders/>
      </CodeExample>
    </div>
  ))
  .add('Card', () => (
    <div>
      <Markdown source={CardReadme}/>

      <CodeExample title="Grid with card layout" code={ExampleGridStandardRaw}>
        <ExampleGridStandard/>
      </CodeExample>

      <CodeExample title="Cards with action headers" code={ExampleGridActionHeadersRaw}>
        <ExampleGridActionHeaders/>
      </CodeExample>

      <CodeExample title="Grid with equal height row" code={ExampleRowWithEqualHeightRaw}>
        <ExampleRowWithEqualHeight/>
      </CodeExample>

      <CodeExample title="Grid with auto adjusted row" code={ExampleAutoAdjustedRowRaw}>
        <ExampleAutoAdjustedRow/>
      </CodeExample>

      <CodeExample title="Grid with card RTL" code={ExampleGridRTLRaw}>
        <ExampleGridRTL/>
      </CodeExample>

      <CodeExample title="Cards with collapsed header" code={ExampleCollapseableHeadersRaw}>
        <ExampleCollapseableHeaders/>
      </CodeExample>

      <CodeExample title="Card without Grid" code={ExampleOutsideGridRaw}>
        <ExampleOutsideGrid/>
      </CodeExample>
    </div>
  ))
;
