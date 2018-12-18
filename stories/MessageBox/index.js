import React from 'react';
import { storiesOf } from '@storybook/react';
import Alert from './Alert.story';
import Announcement from './Announcement';
import CustomModal from './CustomModal';

storiesOf('9. Modals', module)
  .add('9.2 Custom Modal', () => <CustomModal />)
  .add('9.3 Announcement', () => <Announcement />);
