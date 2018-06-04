const checkboxDriverFactory = component => ({
  click: () => component.click(),
  element: () => component
});

export default checkboxDriverFactory;
