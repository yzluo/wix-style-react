import React from 'react';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../../src/MessageBox/README.md';
import ReadmeTestKit from '../../src/MessageBox/README.TESTKIT.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import StandardAlert from './AlertExamples/Standard';
import StandardAlertRaw from '!raw-loader!./AlertExamples/Standard';

import SecondaryAlert from './AlertExamples/Secondary';
import SecondaryAlertRaw from '!raw-loader!./AlertExamples/Secondary';

import FootNoteAlert from './AlertExamples/FootNote';
import FootNoteAlertRaw from '!raw-loader!./AlertExamples/FootNote';

import ScrollableAlert from './AlertExamples/Scrollable';
import ScrollableAlertRaw from '!raw-loader!./AlertExamples/Scrollable';

const introduction = `# Alert (\`<MessageBoxFunctionalLayout/>\`)
Components to be used within \`wix-style-react/Modal\`:
`;

const layoutStyles = {
  margin: '0 30px'
};

export default () => (
  <TabbedView tabs={['Usage', 'API', 'TestKits']}>
    <div>
      <Markdown source={introduction}/>
      <div style={layoutStyles}>
        <CodeExample
          title="Standard"
          code={StandardAlertRaw}
          children={<StandardAlert/>}
          />
        <CodeExample
          title="Secondary Action"
          code={SecondaryAlertRaw}
          children={<SecondaryAlert/>}
          />
        <CodeExample
          title="Footnote"
          code={FootNoteAlertRaw}
          children={<FootNoteAlert/>}
          />
        <CodeExample
          title="Scrollable"
          code={ScrollableAlertRaw}
          children={<ScrollableAlert/>}
          />
      </div>
    </div>

    <Markdown source={Readme}/>

    <Markdown source={ReadmeTestKit}/>
  </TabbedView>
);
