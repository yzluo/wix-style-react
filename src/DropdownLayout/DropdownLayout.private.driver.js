import dropdownLayoutDriverFactory from './DropdownLayout.driver';

const dropdownLayoutPrivateDriverFactory = ({
  element,
  wrapper,
  component,
}) => {
  const options = element.querySelector('[data-hook=dropdown-layout-options]');
  const optionAt = position => options.childNodes[position];
  const optionsLength = () => options.childNodes.length;
  return {
    ...dropdownLayoutDriverFactory({
      element,
      wrapper,
      component,
    }),
    element,
    optionAt,
    optionsLength,
  };
};

export default dropdownLayoutPrivateDriverFactory;
