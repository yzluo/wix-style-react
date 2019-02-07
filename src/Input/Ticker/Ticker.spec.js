import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import { tickerPrivateDriverFactory } from './Ticker.driver.private';
import Ticker from './Ticker';

describe('<Ticker/>', () => {
  const createDriver = createUniDriverFactory(tickerPrivateDriverFactory);
  it('should create a ticker', async () => {
    const driver = createDriver(<Ticker />);
    expect(await driver.exists()).toEqual(true);
  });

  it('should allow handling up action', async () => {
    const onUp = jest.fn();
    const driver = createDriver(<Ticker onUp={onUp} />);
    await driver.clickUp();
    expect(onUp).toHaveBeenCalled();
  });

  it('should allow handling down action', async () => {
    const onDown = jest.fn();
    const driver = createDriver(<Ticker onDown={onDown} />);
    await driver.clickDown();
    expect(onDown).toHaveBeenCalled();
  });

  it('should allow disabling up action', async () => {
    const onUp = jest.fn();
    const driver = createDriver(<Ticker onUp={onUp} upDisabled />);
    expect(await driver.isUpDisabled()).toEqual(true);
    await driver.clickUp();
    expect(onUp).not.toHaveBeenCalled();
  });

  it('should allow disabling down action', async () => {
    const onDown = jest.fn();
    const driver = createDriver(<Ticker onDown={onDown} downDisabled />);
    expect(await driver.isDownDisabled()).toEqual(true);
    await driver.clickUp();
    expect(onDown).not.toHaveBeenCalled();
  });
});
