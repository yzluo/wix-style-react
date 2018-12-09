import React from 'react';
import { ItemPickerOption } from './ItemPickerOptionBuilder';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import itemPickerOptionDriverFactory from './ItemPickerOptionBuilder.driver';

describe('item picker option builder', () => {
  const createDriver = createDriverFactory(itemPickerOptionDriverFactory);
  const title = 'Some Title';
  const subtitle = 'some subtitle';

  it('should display item', () => {
    const driver = createDriver(ItemPickerOption({ title }));
    expect(driver.exists()).toBeTruthy();
  });

  it('should display item with Title', () => {
    const driver = createDriver(ItemPickerOption({ title }));
    expect(driver.getTitle()).toEqual(title);
  });

  it('should display item with Title and subtitle', () => {
    const driver = createDriver(ItemPickerOption({ title, subtitle }));
    expect(driver.getTitle()).toEqual(title);
    expect(driver.getSubtitle()).toEqual(subtitle);
  });
});
