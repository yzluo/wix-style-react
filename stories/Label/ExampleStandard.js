import React from 'react';
import Label from 'wix-style-react/Label';
import Input from 'wix-style-react/Input';

export default () =>
  <div style={{display: 'flex', alignItems: 'center'}}>
    <Label dataHook="story-label" for="my-input-id" size="medium">
      Label text
    </Label>&nbsp;
    <Input id="my-input-id"/>
  </div>;
