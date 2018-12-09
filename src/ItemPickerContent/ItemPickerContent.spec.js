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





  it('should have search component', () => {
    const driver = createDriver(itemPickerContentComponent());
    expect(driver.searchExists()).toBeTruthy();
  });

});
