import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import NumberInput from '../../src/NumberInput';

const example = `
class NumberField extends React.Component {
  constructor() {
    this.state = {
      value: 0,
    };
  }

  render() {
    const onChange = e => this.setState({ value: e.target.value });

    return (
      <FormField label="Number">
        <NumberInput
          {...this.props}
          value={this.state.value}
          onChange={onChange}
        />
      </FormField>
    );
  }
}
`;
export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: NumberInput,
  componentPath: '../../src/NumberInput/NumberInput.js',

  componentProps: {
    dataHook: storySettings.dataHook,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={example}
      />
    </div>
  ),
};
