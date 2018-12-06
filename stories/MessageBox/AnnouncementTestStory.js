import React from 'react';

import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../storiesHierarchy';

import { MessageBoxMarketerialLayout } from 'wix-style-react/MessageBox';
import IllustrationIcon from './AnnouncementExamples/IllustrationIcon';

import styles from './AnnouncementTestStory.scss';
import { storySettings } from './storySettings';

import { Snapshot } from './Snapshot';

const Announcement = props => {
  const { snapshotName, ...rest } = props;
  return (
    <Snapshot name={props.snapshotName}>
      <MessageBoxMarketerialLayout
        title="Looking good! Your site is on Google"
        content="All of your pages are indexed and now come up as separate search results on Google. This is great for your visbility!"
        confirmText="Button"
        theme="blue"
        primaryButtonLabel="Button"
        secondaryButtonLabel="Secondary action"
        {...rest}
      />
    </Snapshot>
  );
};

const AnnouncementTests = storiesOf(
  getTestStoryKind({ category: '9. Modals', storyName: '9.4 Announcement' }),
  module,
);

AnnouncementTests.add('1. Illustration', () => {
  const hooks = storySettings.tests.illustration.dataHooks;
  return (
    <div>
      <Announcement
        snapshotName={hooks.standard}
        illustration={<IllustrationIcon />}
      />
      <Announcement
        snapshotName={hooks.purple}
        illustration={<IllustrationIcon />}
        theme="purple"
      />
      <Announcement
        snapshotName={hooks.highestImage}
        illustration={<img src="https://picsum.photos/100/150?image=0" />}
      />
    </div>
  );
});

AnnouncementTests.add('2. ImageComponent', () => {
  const hooks = storySettings.tests.imageComponent.dataHooks;
  return (
    <div className={styles.container}>
      <Announcement
        dataHook={hooks.standard}
        imageComponent={<img src="https://picsum.photos/100/100?image=0" />}
      />
    </div>
  );
});
