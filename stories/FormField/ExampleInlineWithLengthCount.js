import React from 'react';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';

export default () => (
  <FormField
    label="Tweet"
    labelPlacement="left"
    dataHook="storybook-formfield-inline-label-length-count"
  >
    {({ setCharactersLeft }) => (
      <Input
        dataHook="storybook-formfield-inline-label-length-count-input"
        onChange={event => setCharactersLeft(20 - event.target.value.length)}
      />
    )}
  </FormField>
);
