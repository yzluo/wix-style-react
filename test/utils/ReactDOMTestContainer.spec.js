import React from 'react';
import {ReactDOMTestContainer} from './ReactDOMTestContainer';

const uniDriverFactory = base => {
  return {
    click: async () => await base.click()
  };
};

const basicDriverFactory = ({element, eventTrigger}) => {
  return {
    click: () => eventTrigger.click(element)
  };
};

describe('ReactDomTestContainer', () => {
  const createUniDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(uniDriverFactory);

  const createBasicDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createRenderer(basicDriverFactory);

  it('should work with unidriver renderer', async () => {
    const onClick = jest.fn();
    const driver = await createUniDriver(<button onClick={onClick}/>);
    await driver.click();
    expect(onClick).toBeCalled();
  });

  it('should work with basic renderer', async () => {
    const onClick = jest.fn();
    const driver = await createBasicDriver(<button onClick={onClick}/>);
    driver.click();
    expect(onClick).toBeCalled();
  });
});
