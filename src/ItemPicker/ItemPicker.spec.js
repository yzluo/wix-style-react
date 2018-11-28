import React from 'react';
import { ItemPicker } from './ItemPicker';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import itemPickerDriverFactory from './ItemPicker.driver';
import Button from "../Button";
import EmptyState from "../EmptyState/EmptyState";

describe('item picker', () => {
  const createDriver = createDriverFactory(itemPickerDriverFactory);

  const itemPickerComponent = ({ button, fetchItems, emptyStateComponent, itemBuilder, footer, onSelect } = {}) =>
    <ItemPicker button={button ? button : <Button data-hook={'button'}/>}
                fetchItems={fetchItems ? fetchItems : () => Promise.resolve([])}
                emptyStateComponent={emptyStateComponent ? emptyStateComponent : () => <EmptyState
                  data-hook='empty-message'/>}
                itemBuilder={itemBuilder ? itemBuilder : () => {
                }}
                footer={footer ? footer : <div data-hook='footer'/>}
                onSelect={onSelect ? onSelect : () => {
                }}/>;


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
