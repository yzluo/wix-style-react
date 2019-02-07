import { richTextInputAreaDriverFactory as publicDriverFactory } from './RichTextInputArea.driver';

export const richTextInputAreaPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
