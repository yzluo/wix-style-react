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
    element,
  };
};

export default dropdownLayoutPrivateDriverFactory;
