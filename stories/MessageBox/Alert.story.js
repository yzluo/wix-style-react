import React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';

import CodeExample from 'wix-storybook-utils/CodeExample';

import StandardAlert from './AlertExamples/Standard';
import StandardAlertRaw from '!raw-loader!./AlertExamples/Standard';

import SecondaryAlert from './AlertExamples/Secondary';
import SecondaryAlertRaw from '!raw-loader!./AlertExamples/Secondary';

import FootNoteAlert from './AlertExamples/FootNote';
import FootNoteAlertRaw from '!raw-loader!./AlertExamples/FootNote';

import Image from './AlertExamples/Image';
import ImageRaw from '!raw-loader!./AlertExamples/Image';

import ImageWithSideAction from './AlertExamples/ImageWithSideAction';
import ImageWithSideActionRaw from '!raw-loader!./AlertExamples/ImageWithSideAction';

import ScrollableAlert from './AlertExamples/Scrollable';
import ScrollableAlertRaw from '!raw-loader!./AlertExamples/Scrollable';

import EmptyStateAlert from './AlertExamples/EmptyState';
import EmptyStateAlertRaw from '!raw-loader!./AlertExamples/EmptyState';

import ActionsAlert from './AlertExamples/Actions';
import ActionsAlertRaw from '!raw-loader!./AlertExamples/Actions';

import StandardMessageBoxFunctionalLayout from './DestructiveAlertExamples/Standard';
import StandardMessageBoxFunctionalLayoutRaw from '!raw-loader!./DestructiveAlertExamples/Standard';

import SecondaryMessageBoxFunctionalLayout from './DestructiveAlertExamples/Secondary';
import SecondaryMessageBoxFunctionalLayoutRaw from '!raw-loader!./DestructiveAlertExamples/Secondary';

const introduction = `# Alert (\`<MessageBoxFunctionalLayout/>\`)
Components to be used within \`wix-style-react/Modal\`:
`;

import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Checkbox from 'wix-style-react/Checkbox';
import Text from 'wix-style-react/Text';

import { storySettings } from './alertStorySettings';

const layoutStyles = {
  margin: '0 30px',
};

const sideActions = (
  <Checkbox>
    <Text>{`Please don't show me this again.`}</Text>
  </Checkbox>
);

const scrollableContent = (
  <div>
    <div>
      This is a generic message. No harm done, but really needed to interrupt
      you.
    </div>
    <div>It has multiple lines and limited max height</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
  </div>
);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: MessageBoxFunctionalLayout,
  componentPath: '../../src/MessageBox/MessageBoxFunctionalLayout.js', // TODO: need to fix address
  componentProps: {
    dataHook: storySettings.dataHook,
    theme: 'blue',
    title: 'Title',
    confirmText: 'Action',
    cancelText: '',
  },

  exampleProps: {
    theme: [
      { label: 'Success', value: 'green' },
      { label: 'Alert', value: 'blue' },
      { label: 'Destructive Alert', value: 'red' },
    ],
    maxHeight: [{ label: '200px', value: '200px' }],
    children: [
      {
        label: 'Simple Message',
        value:
          'This is a generic message. No harm done, but really needed to interrupt you.',
      },
      {
        label: 'Scrollable Content (also set maxHeight)',
        value: scrollableContent,
      },
    ],
    sideActions: [{ label: 'With Side Actions', value: sideActions }],
  },

  examples: (
    <div>
      <Markdown source={introduction} />

      <h1>Examples</h1>

      <div style={layoutStyles}>
        <CodeExample
          title="Standard"
          code={StandardAlertRaw}
          children={<StandardAlert />}
        />
        <CodeExample
          title="Secondary Action"
          code={SecondaryAlertRaw}
          children={<SecondaryAlert />}
        />
        <CodeExample
          title="Footnote"
          code={FootNoteAlertRaw}
          children={<FootNoteAlert />}
        />
        <CodeExample
          title="With EmptyState"
          code={EmptyStateAlertRaw}
          children={<EmptyStateAlert />}
        />
        <CodeExample
          title="Scrollable"
          code={ScrollableAlertRaw}
          children={<ScrollableAlert />}
        />
        <CodeExample title="With image" code={ImageRaw} children={<Image />} />
        <CodeExample
          title="With Actions"
          code={ActionsAlertRaw}
          children={<ActionsAlert />}
        />
        <CodeExample
          title="With Image And Actions"
          code={ImageWithSideActionRaw}
          children={<ImageWithSideAction />}
        />

        <CodeExample
          title="Destructive Alert"
          code={StandardMessageBoxFunctionalLayoutRaw}
          children={<StandardMessageBoxFunctionalLayout />}
        />
        <CodeExample
          title="Destructive Alert with Secondary Action"
          code={SecondaryMessageBoxFunctionalLayoutRaw}
          children={<SecondaryMessageBoxFunctionalLayout />}
        />
      </div>
    </div>
  ),
};
