const inputDriverFactory = async (component, page) => {
  const input = await component.$('input');
  return {
    element: () => component,
    enterText: text => input.type(text),
    getText: () => page.evaluate(_input => _input.value, input),
  };
};

export default inputDriverFactory;
