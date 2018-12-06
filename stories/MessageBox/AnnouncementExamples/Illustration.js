/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxMarketerialLayout } from 'wix-style-react/MessageBox';
import IllustrationIcon from './IllustrationIcon';

export default () => (
  <MessageBoxMarketerialLayout
    title="Looking good! Your site is on Google"
    content="All of your pages are indexed and now come up as separate search results on Google. This is great for your visbility!"
    confirmText="Button"
    illustration={<IllustrationIcon />}
    theme="blue"
    primaryButtonLabel="Button"
    secondaryButtonLabel="Secondary action"
    dataHook="announcement-standard"
  />
);
