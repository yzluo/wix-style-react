import inputWithOptionsDriverFactory from './InputWithOptions.driver';

const inputWithOptionsPrivateDriverFactory = ({ element, wrapper }) => {
  // Assuming `dropDirectionUp===false`
  const dropdownLayoutElement = element && element.childNodes[1].childNodes[0];

  return {
    ...inputWithOptionsDriverFactory({ element, wrapper }),
    dropdownLayoutElement,
    element,
  };
};

export default inputWithOptionsPrivateDriverFactory;
