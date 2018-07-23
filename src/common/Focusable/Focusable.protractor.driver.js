import {
  isFocused,
  hasAttribute,
  INTERNAL_DRIVER_SYMBOL,
} from '../../test-common';

const focusableDriverFactory = ({
  rootElement,
  clickableElements,
  nativeFocusableElement,
}) => {
  if (!rootElement || !clickableElements || !nativeFocusableElement) {
    throw new Error('focusableDriverFactory: Invalid aruments');
  }

  return {
    isFocused: () => isFocused(nativeFocusableElement),
    [INTERNAL_DRIVER_SYMBOL]: {
      rootElement,
      hasFocusState: () => hasAttribute(rootElement, 'data-focus'),
      hasFocusVisibleState: () =>
        hasAttribute(rootElement, 'data-focus-visible'),
      clickRoot: () => rootElement.click(),
      clickableElements,
    },
  };
};

export default focusableDriverFactory;
