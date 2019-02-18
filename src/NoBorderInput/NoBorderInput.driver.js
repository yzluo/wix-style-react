import inputDriverFactory from '../Input/Input.driver';

const noBorderInputDriverFactory = ({ element }) => {
  const inputDriver = inputDriverFactory({
    element: element.querySelector('[data-hook="base-input"]'),
    wrapper: element,
  });

  return {
    ...inputDriver,
    // No unique functions at the moment
    // anyUniqueDriverFunctionForThisComponent: () => {
    //  .......
    // },
  };
};

export default noBorderInputDriverFactory;
