import React from 'react';
import { ItemPickerOption } from "../ItemPickerOption";

export const ItemPickerOptionBuilder = ({ title, subtitle, imageUrl }) =>
  <ItemPickerOption title={title} subtitle={subtitle} imageUrl={imageUrl} />;
