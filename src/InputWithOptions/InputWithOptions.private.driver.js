import inputWithOptionsDriverFactory from './InputWithOptions.driver';
import dropdownLayoutPrivateDriverFactory from '../DropdownLayout/DropdownLayout.private.driver';

const inputWithOptionsPrivateDriverFactory = ({ element, wrapper }) => {
  // Assuming `dropDirectionUp===false`
  const dropdownLayoutElement = element && element.childNodes[1].childNodes[0];

  return {
    ...inputWithOptionsDriverFactory({ element, wrapper }),
    dropdownLayoutDriver: dropdownLayoutPrivateDriverFactory({
      element: dropdownLayoutElement,
    }),
    /** Get DOM attribute of the root element */
    getAttribute: attr => element.getAttribute(attr),
  };
};

export default inputWithOptionsPrivateDriverFactory;
