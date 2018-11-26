import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../storiesHierarchy';
import Avatar from '../../src/Avatar';
import { storySettings } from './storySettings';
import style from './AvatarTestStory.scss';

const kind = getTestStoryKind({
  category: storySettings.category,
  storyName: storySettings.storyName,
});
import { WixStyleReact } from '../../src/WixStyleReact';

storiesOf(kind, module).add(storySettings.testStories.SIZES, () => {
  return (
    <WixStyleReact>
      <div className={style.container}>
        {[
          'size90',
          'size72',
          'size60',
          'size48',
          'size36',
          'size30',
          'size24',
          'size18',
        ].map(size => (
          <Avatar name="John Doe" size={size} key={size} />
        ))}
      </div>
    </WixStyleReact>
  );
});

storiesOf(kind, module).add(storySettings.testStories.COLORS, () => {
  return (
    <WixStyleReact>
      <div className={style.container}>
        {['blue', 'green', 'grey', 'red', 'orange'].map(color => (
          <Avatar name="John Doe" color={color} key={color} />
        ))}
      </div>
    </WixStyleReact>
  );
});

storiesOf(kind, module).add(storySettings.testStories.PLACEHOLDER, () => {
  return (
    <WixStyleReact>
      <div className={style.container}>
        {[
          'size90',
          'size72',
          'size60',
          'size48',
          'size36',
          'size30',
          'size24',
          'size18',
        ].map(size => (
          <Avatar size={size} key={size} />
        ))}
      </div>
    </WixStyleReact>
  );
});
