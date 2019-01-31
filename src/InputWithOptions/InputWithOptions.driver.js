import inputDriverFactory from '../Input/Input.driver';
import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';

const inputWithOptionsDriverFactory = ({ element }) => {
  const inputWrapper = element && element.childNodes[0];
  const inputDriver =
    element &&
    inputDriverFactory({
      element: inputWrapper.childNodes[0],
      wrapper: inputWrapper,
    });
  const dropdownLayoutDriver =
    element &&
    dropdownLayoutDriverFactory({
      element: element.childNodes[1].childNodes[0],
    });

  const assertOptionsOpen = () => {
    if (!dropdownLayoutDriver.isShown()) {
      inputDriver.focus();
      inputDriver.keyDown('ArrowDown');
      if (!dropdownLayoutDriver.isShown()) {
        throw new Error('Options dropdown should be open!');
      }
    }
  };

  const driver = {
    exists: () => !!element,
    /** Select an option by id. (If dropdown options is not opened yet, this will open it and click on the option) */
    selectOptionById: id => {
      // Although it is not necessary for options to be shown in order to simulate an option click.
      // We assert that the options ARE shown, so to simulate real user behavior.
      assertOptionsOpen();
      dropdownLayoutDriver.optionById(id).click();
    },
    isReadOnly: () =>
      inputDriver.getReadOnly() && inputWrapper.className.includes('readonly'),
    inputWrapper: () => inputWrapper,
    focus: () => inputDriver.focus(),
    blur: () => dropdownLayoutDriver.mouseClickOutside(),
    pressKey: key => inputDriver.keyDown(key),
    outsideClick: () =>
      document.body.dispatchEvent(new Event('mouseup', { cancelable: true })),
    isOptionWrappedToHighlighter: optionId => {
      const { element: optionElm } = dropdownLayoutDriver.optionById(optionId);
      return !!optionElm().querySelector(`[data-hook=highlighter-${optionId}]`);
    },
  };

  return {
    exists: () => driver.exists(),
    driver,
    inputDriver,
    dropdownLayoutDriver,
  };
};

export default inputWithOptionsDriverFactory;
