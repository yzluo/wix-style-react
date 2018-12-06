import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import Counter from './Counter';
import { counterPrivateDriverFactory } from './Counter.driver.private';

describe('Counter', () => {
  const createDriver = createUniDriverFactory(counterPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<Counter />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getCount()).toEqual(0);
  });

  it('should allow setting the initial count', async () => {
    const driver = createDriver(<Counter initialCount={5} />);

    expect(await driver.getCount()).toEqual(5);
  });

  it('should increment', async () => {
    const driver = createDriver(<Counter />);

    await driver.clickIncrement();
    expect(await driver.getCount()).toEqual(1);
  });

  it('should decrement', async () => {
    const driver = createDriver(<Counter />);

    await driver.clickDecrement();
    expect(await driver.getCount()).toEqual(-1);
  });

  it('should call onCountUpdate', async () => {
    const onCountUpdateMock = jest.fn();
    const driver = createDriver(
      <Counter initialCount={5} onCountUpdate={onCountUpdateMock} />,
    );

    await driver.clickIncrement();
    expect(onCountUpdateMock).toHaveBeenCalledTimes(1);
    expect(onCountUpdateMock).toHaveBeenCalledWith(6);
  });

  it('should allow changing the buttons text', async () => {
    const driver = createDriver(
      <Counter incrementText="Increment" decrementText="Decrement" />,
    );

    expect(await driver.getIncrementText()).toEqual('Increment');
    expect(await driver.getDecrementText()).toEqual('Decrement');
  });
});
