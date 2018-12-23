import dropdownLayoutDriverFactory from './DropdownLayout.driver';

const dropdownLayoutPrivateDriverFactory = ({
  element,
  wrapper,
  component,
}) => {
  return {
    ...dropdownLayoutDriverFactory({
      element,
      wrapper,
      component,
    }),
    /** Get DOM attribute of the root element */
    getAttribute: attr => element.getAttribute(attr),
  };
};

export default dropdownLayoutPrivateDriverFactory;
