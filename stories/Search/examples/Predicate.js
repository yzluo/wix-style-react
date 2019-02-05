import React from 'react';

import * as wsrScope from '../../../src/index';
import LiveCodeExample from '../../utils/Components/LiveCodeExample';
import { Section } from '../../UXStoryTemplate';

const Example = `
class SearchPredicate extends React.Component {
  
  constructor() {
    this.state = {
      options: [
        { id: 1, value: <div style={{color: 'blue'}}>111</div>, metadata: { keywords: ['one', '1', 'first'] }},
        { id: 2, value: <div style={{color: 'orange'}}>222</div>, metadata: { keywords: ['two', '2', 'second'] }},
        { id: 3, value: <div style={{color: 'red'}}>333</div>, metadata: { keywords: ['three', '3', 'third'] }},
      ],
      value: '',
    };
  }

  render() {
    const predicate = option => option.metadata.keywords.includes(this.state.value);
    const onChange = e => this.setState({ value: e.target.value })
    return (
      <Search
        value={this.state.value}
        onChange={onChange}
        predicate={predicate}
        options={this.state.options}
      />
    );
  }
}`;

export default () => {
  return (
    <Section title="Predicate">
      <wsrScope.Layout>
        <wsrScope.Cell span={6}>
          <LiveCodeExample
            scope={wsrScope}
            compact
            title="Using custom predicate function for filtering"
            initialCode={Example}
          />
        </wsrScope.Cell>
      </wsrScope.Layout>
    </Section>
  );
};
