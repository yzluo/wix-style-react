import React from 'react';
import * as icons from 'wix-ui-icons-common';

import Avatar from '../../src/Avatar';
import { storySettings } from './storySettings';
import { AutoStoryComponentWrapper } from '../AutoStoryComponentWrapper';

const IMG_REAL_URL = 'https://randomuser.me/api/portraits/women/39.jpg';
const IMG_INVALID_URL = 'https://1234.me/4321.jpg';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Avatar,
  componentWrapper: AutoStoryComponentWrapper,
  componentPath: '../../src/Avatar/Avatar.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    name: 'John Doe',
  },
  exampleProps: {
    size: [
      'size90',
      'size72',
      'size60',
      'size48',
      'size36',
      'size30',
      'size24',
      'size18',
    ],
    color: ['blue', 'green', 'grey', 'red', 'orange'],
    imgProps: [
      { label: 'With Image', value: { src: IMG_REAL_URL } },
      { label: 'With Invalid Image URL', value: { src: IMG_INVALID_URL } },
    ],
    placeholder: Object.entries(icons).map(([name, icon]) => ({
      label: name,
      value: React.createElement(icon),
    })),
  },
};
