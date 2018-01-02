const googleMapsIframeClientDriverFactory = component => {
  const getButtons = () => component.$$('button');
  const input = component.$('input');
  const resultsElementWrapper = () => $('pre');

  return {
    getParsedResults: () => resultsElementWrapper().getText(),
    getResultsElementWrapper: () => resultsElementWrapper(),
    enterText: text => input.clear().sendKeys(text),
    selectByValue: value => {
      return getButtons().getText()
        .then(names => {
          const btnIdx = names.indexOf(value);
          getButtons().get(btnIdx).click();
        });
    },
    element: () => component
  };
};

export default googleMapsIframeClientDriverFactory;

