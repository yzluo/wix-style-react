/* eslint-disable react/prop-types */
import React from 'react';
import {MessageBoxFunctionalLayout} from 'wix-style-react/MessageBox';
import Checkbox from 'wix-style-react/Checkbox';

export default () => (
  <MessageBoxFunctionalLayout
    title="Message With Actions"
    confirmText="Confirm"
    cancelText="Cancel"
    theme="blue"
    dataHook="actions-message"
    sideActions={<Checkbox>{`Please don't show me this again.`}</Checkbox>}
    >
    This is a generic message. No harm done, but really needed to interrupt you.
  </MessageBoxFunctionalLayout>
);
