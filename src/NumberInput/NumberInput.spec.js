import React from 'react';
import {createUniDriverFactory} from 'wix-ui-test-utils/uni-driver-factory';

import NumberInput from './NumberInput';
import {numberInputPrivateDriverFactory} from './NumberInput.driver.private';

describe ('NumberInput', () => {
  const createDriver = createUniDriverFactory (numberInputPrivateDriverFactory);

  it ('should render', async () => {
    const driver = createDriver (<NumberInput />);
    expect (await driver.exists ()).toBeTruthy ();
  });

  it ('should increment value', async () => {
    const value = 0, onChange = jest.fn ();
    const driver = createDriver (
      <NumberInput onChange={onChange} value={value} />
    );
    await driver.clickOnIncrement ();
    expect (onChange).toHaveBeenCalledWith ('1');
  });
});
