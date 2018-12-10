import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';
import { ItemPickerOptionBuilder } from 'wix-style-react/ItemPickerOptionBuilder';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '240px',
  lineHeight: '22px',
};

const options = [
  ItemPickerOptionBuilder({ id: 0, title: 'Title 1', subtitle: 'subtitle 1' }),
  ItemPickerOptionBuilder({ id: 1, title: 'Title 2', subtitle: 'subtitle 2' }),
  ItemPickerOptionBuilder({ id: 2, title: 'Title 3', subtitle: 'subtitle 3' }),
  ItemPickerOptionBuilder({ id: 3, title: 'No subtitle item' }),
  ItemPickerOptionBuilder({ id: 3, title: 'Title 4', subtitle: 'subtitle 4' }),
];

export default () => (
  <div style={style}>
    <DropdownLayout visible selectedId={0} options={options} />
  </div>
);
