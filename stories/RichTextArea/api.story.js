import React from 'react';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  tab,
  api,
  code as baseCode,
  importExample,
  description,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';

import { Category } from '../storiesHierarchy';
import RichTextArea from 'wix-style-react/RichTextArea';

const code = config =>
  baseCode({
    components: baseScope,
    ...config,
  });

export default {
  category: Category.COMPONENTS,
  storyName: 'RichTextArea',
  component: RichTextArea,
  componentPath: '../../src/RichTextArea/RichTextArea.js',

  sections: [
    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'TestKit',
      sections: [testkit()],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),
  ],
};
