import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import NumberInput from './NumberInput';
import { numberInputPrivateDriverFactory } from './NumberInput.driver.private';

describe('NumberInput', () => {
  const createDriver = createUniDriverFactory(numberInputPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<NumberInput />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const driver = createDriver(<NumberInput />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button 2 times',
    );
  });

  it('should allow changing the button text', async () => {
    const driver = createDriver(<NumberInput buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
