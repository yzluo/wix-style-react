import React from 'react';
//import ReactTestUtils from 'react-dom/test-utils';
import calendarDriverFactory from './Calendar.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
//import {checkboxTestkitFactory} from '../../testkit';
import Calendar from './Calendar';
//import {mount} from 'enzyme';

const originalConsoleWarn = global.console.warn; // eslint-disable-line no-console

describe('Old prop deprecation', () => {
  const createDriver = createDriverFactory(calendarDriverFactory);

  beforeEach(() => {
    global.console.warn = jest.fn();
  });

  it('shows no deprecationLog when neither value nor onChange is used', () => {
    const driver = createDriver(
      <Calendar/>
    );
    expect(driver.exists()).toBeTruthy();
    expect(global.console.warn.mock.calls.length).toEqual(0);
  });

  it('should show deprecationLog when the value prop is used', () => {
    const driver = createDriver(
      <Calendar
        value={new Date()}
        />
    );
    expect(driver.exists()).toBeTruthy();
    expect(global.console.warn.mock.calls.length).toEqual(1);
  });

  it('should show deprecationLog when the onChange prop is used', () => {
    const driver = createDriver(
      <Calendar
        onChange={() => {}}
        />
    );
    expect(driver.exists()).toBeTruthy();
    expect(global.console.warn.mock.calls.length).toEqual(1);
  });

  afterAll(() => {
    global.console.warn = originalConsoleWarn;
  });
});

describe('selectedDays prop', () => {
  const createDriver = createDriverFactory(calendarDriverFactory);

  it('overrides the value prop', () => {
    const value = new Date(2018, 10, 1);
    const selectedDays = new Date(2018, 9, 1);

    const driver = createDriver(
      <Calendar
        value={value}
        selectedDays={selectedDays}
        />
    );
    expect(driver.getMonthCaption()).toEqual('October');
  });
});
