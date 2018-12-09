import React from 'react';
import { ItemPicker } from './ItemPicker';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import itemPickerDriverFactory from './ItemPicker.driver';
import Button from '../Button';
import EmptyState from '../EmptyState/EmptyState';
import { dataHooks } from '../ItemPickerContent/utils';

describe('item picker', () => {
  const createDriver = createDriverFactory(itemPickerDriverFactory);

  const itemPickerComponent = ({
    button = <Button data-hook={'button'} />,
    fetchItems = () => Promise.resolve([]),
    emptyStateComponent = <EmptyState dataHook="empty-message" />,
    itemBuilder = () => {},
    footer = <div data-hook={dataHooks.footer} />,
    onSelect = () => {},
  } = {}) => (
    <ItemPicker
      button={button}
      fetchItems={fetchItems}
      emptyStateComponent={emptyStateComponent}
      itemBuilder={itemBuilder}
      footer={footer}
      onSelect={onSelect}
    />
  );

  it('item picker tooltip should not be shown by default', () => {
    const driver = createDriver(itemPickerComponent());

    expect(driver.tooltipShown()).toBe(false);
  });

  it('item picker tooltip should be shown when tooltip is clicked', () => {
    const driver = createDriver(itemPickerComponent());
    driver.clickTooltip();
    expect(driver.tooltipShown()).toBe(false);
  });
});
