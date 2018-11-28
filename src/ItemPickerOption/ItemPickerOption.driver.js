import React from 'react';
import { textTestkitFactory, avatarTestkitFactory } from '../../testkit';

const itemPickerOptionDriverFactory = ({ element }) => {
  const titleDriver = () =>
    textTestkitFactory({
      wrapper: element,
      dataHook: 'item-picker-option-title',
    });

  const subtitleDriver = () =>
    textTestkitFactory({
      wrapper: element,
      dataHook: 'item-picker-option-subtitle',
    });

  const avatarDriver = () =>
    avatarTestkitFactory({
      wrapper: element,
      dataHook: 'item-picker-option-avatar',
    });

  return {
    exists: () => !!element,
    title: () => titleDriver().getText(),
    subtitle: () => subtitleDriver().getText(),
    avatarText: () => avatarDriver().getTextContent(),
  };
};

export default itemPickerOptionDriverFactory;
