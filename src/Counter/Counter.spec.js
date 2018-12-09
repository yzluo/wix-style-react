import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import Counter from './Counter';
import { counterPrivateDriverFactory } from './Counter.driver.private';

describe('Counter', () => {
  const createDriver = createUniDriverFactory(counterPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<Counter />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const driver = createDriver(<Counter />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button 2 times',
    );
  });

  it('should allow changing the buttons text', async () => {
    const driver = createDriver(<Counter buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
