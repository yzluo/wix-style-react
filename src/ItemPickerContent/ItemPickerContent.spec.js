import React from 'react';
import { ItemPickerContent } from './ItemPickerContent';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import itemPickerContentDriverFactory from './ItemPickerContent.driver';
import EmptyState from '../EmptyState/EmptyState';
import { dataHooks } from './utils';

describe('item picker', () => {
  const createDriver = createDriverFactory(itemPickerContentDriverFactory);

  const itemPickerContentComponent = ({
    fetchItems = () => Promise.resolve([]),
    emptyStateComponent = <EmptyState dataHook={dataHooks.emptyMessage} />,
    itemBuilder = () => {},
    footer = <div data-hook={dataHooks.footer} />,
    onSelect = () => {},
  } = {}) => (
    <ItemPickerContent
      fetchItems={fetchItems}
      emptyStateComponent={emptyStateComponent}
      itemBuilder={itemBuilder}
      footer={footer}
      onSelect={onSelect}
    />
  );

  it('should have search component', () => {
    const driver = createDriver(itemPickerContentComponent());
    expect(driver.searchExists()).toBeTruthy();
  });

  it('should present empty message when there are no items', () => {
    const driver = createDriver(itemPickerContentComponent());
    expect(driver.emptyMessageExists()).toBeTruthy();
  });

  it('should call fetch items when mounted ', () => {
    const fetchItems = jest.fn().mockImplementation(() => Promise.resolve([]));
    const driver = createDriver(itemPickerContentComponent({ fetchItems }));

    expect(fetchItems).toHaveBeenCalledTimes(1);
  });

  it('should present dropdown when items are found', () => {
    const fetchItems = () =>
      Promise.resolve([{ id: 'some-id', title: 'some title' }]);
    const driver = createDriver(itemPickerContentComponent({ fetchItems }));

    expect(driver.dropdownExists()).toBeTruthy();
  });

  it('should call fetch items with searched query', () => {
    const someQuery = 'someQuery';
    const fetchItems = jest
      .fn()
      .mockImplementation(query => Promise.resolve([]));
    const driver = createDriver(itemPickerContentComponent({ fetchItems }));

    driver.searchFor(someQuery);
    expect(fetchItems).toHaveBeenCalledTimes(2);
  });
});
