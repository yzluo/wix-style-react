import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import ChangePositionReadme from './ChangePosition.md';
import ChangePosition from './ChangePosition';
import ChangePositionRaw from '!raw-loader!./ChangePosition';
import ChangePositionScssRaw from '!raw-loader!./ChangePosition.scss';

const ChangePositionRawCombined = `
//ChangePosition.js
${ChangePositionRaw}

//ChangePosition.scss
${ChangePositionScssRaw}
`;

export default () => (
  <div>
    <Markdown source={ChangePositionReadme}/>
    <CodeExample title="Change Position example" code={ChangePositionRawCombined}>
      <ChangePosition/>
    </CodeExample>
  </div>
);
