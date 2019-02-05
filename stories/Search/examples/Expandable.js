import React from 'react';
import * as wsrScope from '../../../src';
import LiveCodeExample from '../../utils/Components/LiveCodeExample';
import { Section } from '../../UXStoryTemplate';

export default () => {
  return (
    <Section title="Expandable">
      <wsrScope.Layout>
        <wsrScope.Cell span={6}>
          <LiveCodeExample
            scope={wsrScope}
            compact
            title="Click on the icon to expand search"
            initialCode={'<Search expandable />'}
          />
        </wsrScope.Cell>
      </wsrScope.Layout>
    </Section>
  );
};
