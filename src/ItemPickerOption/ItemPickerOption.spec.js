import React from 'react';
import { ItemPickerOption } from './ItemPickerOption';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import itemPickerOptionDriverFactory from './ItemPickerOption.driver';

describe('item picker option builder', () => {
  const createDriver = createDriverFactory(itemPickerOptionDriverFactory);

  it('should display item', () => {
    const someId = 'some ID';

    const driver = createDriver(<ItemPickerOption title={'some title'}/>);
    expect(driver.exists()).toBeTruthy();
  });

  it('should display item with Title', () => {
    const someTitle = 'some Title';
    const someId = 'some ID';
    const driver = createDriver(<ItemPickerOption title={someTitle} />);
    expect(driver.title()).toEqual(someTitle);
  });

  it('should display item with Title and subtitle', () => {
    const someTitle = 'some Title';
    const someId = 'some ID';
    const someSubtitle = 'some Subtitle';
    const driver = createDriver(
      <ItemPickerOption title={someTitle} subtitle={someSubtitle} />,
    );
    expect(driver.title()).toEqual(someTitle);
    expect(driver.subtitle()).toEqual(someSubtitle);
  });

  it.only('should have an avatar with name initials', () => {
    const someTitle = 'Some Title';
    const someTitleInitials = 'ST';
    const someSubtitle = 'some subtitle';
    expect(driver.avatarText()).toEqual(someTitleInitials);
  });
});
