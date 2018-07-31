import React from 'react';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../../src/MessageBox/README.md';
import ReadmeTestKit from '../../src/MessageBox/README.TESTKIT.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import AnnouncementStandard from './AnnouncementExamples/Standard';
import AnnouncementStandardRaw from '!raw-loader!./AnnouncementExamples/Standard';

const introduction = `# Announcement (\`<MessageBoxMarketerialLayout/>\`)
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
          code={AnnouncementStandardRaw}
          children={<AnnouncementStandard/>}
          />
      </div>
    </div>

    <Markdown source={Readme}/>

    <Markdown source={ReadmeTestKit}/>
  </TabbedView>
);
