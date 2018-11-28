import React from 'react';
import { ItemPickerContent } from './ItemPickerContent';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import itemPickerContentDriverFactory from './ItemPickerContent.driver';
import EmptyState from "../EmptyState/EmptyState";

describe('item picker', () => {
  const createDriver = createDriverFactory(itemPickerContentDriverFactory);

  const itemPickerContentComponent = ({ fetchItems, emptyStateComponent, itemBuilder, footer, onSelect } = {}) =>
    <ItemPickerContent fetchItems={fetchItems ? fetchItems : () => Promise.resolve([])}
                       emptyStateComponent={emptyStateComponent ? emptyStateComponent : () => <EmptyState
                         data-hook='empty-message'/>}
                       itemBuilder={itemBuilder ? itemBuilder : () => {
                       }}
                       footer={footer ? footer : <div data-hook='footer'/>}
                       onSelect={onSelect ? onSelect : () => {
                       }}/>;


  it.skip('should display empty message when there are no items', () => {
    const driver = createDriver(itemPickerContentComponent());

    expect(driver.emptyMessageExists()).toBeTruthy();
  });


  it('should have search component', () => {
    const fetchItems = jest.fn(() => Promise.resolve({}));
    const driver = createDriver(itemPickerContentComponent({ fetchItems }));

    expect(fetchItems).toHaveBeenCalledWith({ query: '' });
  });

  it.skip('should fetch items when mount', () => {
    const fetchItems = jest.fn(() => Promise.resolve({}));
    const driver = createDriver(itemPickerContentComponent({ fetchItems }));
    const someSearch = 's';

    driver.searchFor(someSearch);

    expect(fetchItems).toHaveBeenCalledWith({ query: someSearch });
  });

  it.skip('should fetch items and display them if exists', () => {
    });
});
