import React from 'react';

import LiveCodeExample from '../../utils/Components/LiveCodeExample';

import ExamplesFilled from '!raw-loader!./ExamplesFilled';
import ExamplesGhost from '!raw-loader!./ExamplesGhost';
import ExamplesSizes from '!raw-loader!./ExamplesSizes';
import ExamplesPrefix from '!raw-loader!./ExamplesPrefix';
import ExamplesSuffix from '!raw-loader!./ExamplesSuffix';
import ExamplesLoading from '!raw-loader!./ExamplesLoading';
import ExampleRouter from '!raw-loader!./ExampleRouter';
import ExampleAnchor from '!raw-loader!./ExampleAnchor';

import { Layout, Cell } from '../../../src/Layout';
import styles from './ButtonsSpacing.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

class ButtonStory extends React.Component {
  render() {
    return (
      <Layout>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="Button - filled buttons (primary)"
            initialCode={ExamplesFilled}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="Button - ghost buttons (secondary)"
            initialCode={ExamplesGhost}
          />
        </Cell>

        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="Button - sizes"
            initialCode={ExamplesSizes}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="Button - prefix icon"
            initialCode={ExamplesPrefix}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="Button - suffix icon"
            initialCode={ExamplesSuffix}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="Button - loading"
            initialCode={ExamplesLoading}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ Link }}
            title="Button - render as React Router Link"
            initialCode={ExampleRouter}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            title="Button - render as html anchor"
            initialCode={ExampleAnchor}
          />
        </Cell>
      </Layout>
    );
  }
}

export default ButtonStory;
