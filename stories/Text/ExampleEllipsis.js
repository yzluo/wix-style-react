import React from 'react';
import Text from 'wix-style-react/Text';

export default () => (
  <div data-hook="text-with-ellipses" style={{width: '40px'}}>
    <Text>{'veryverylongtext'}</Text>
  </div>
);
