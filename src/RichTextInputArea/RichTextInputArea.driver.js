import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import ReactTestUtils from 'react-dom/test-utils';

export const richTextInputAreaDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    getContent: async () => base.text(),
    enterText: async text => {
      if (base.type === 'react') {
        const editor = await base.$('.public-DraftEditor-content').getNative();
        ReactTestUtils.Simulate.beforeInput(editor, { data: text });
      }
    },
  };
};
