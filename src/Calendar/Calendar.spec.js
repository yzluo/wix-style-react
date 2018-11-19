import React from 'react';
//import ReactTestUtils from 'react-dom/test-utils';
import calendarDriverFactory from './Calendar.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
//import {checkboxTestkitFactory} from '../../testkit';
import Calendar from './Calendar';
//import {mount} from 'enzyme';

const originalConsoleWarn = console.warn; // eslint-disable-line no-console
const createDriver = createDriverFactory(calendarDriverFactory);

describe('Calendar', () => {
  describe('Old prop deprecation', () => {
    beforeEach(() => {
      console.warn = jest.fn(); // eslint-disable-line no-console
    });

    it('shows no deprecationLog when neither value nor onChange is used', () => {
      const driver = createDriver(
        <Calendar/>
      );
      expect(driver.exists()).toBeTruthy();
      expect(console.warn.mock.calls.length).toEqual(0); // eslint-disable-line no-console
    });

    it('should show deprecationLog when the value prop is used', () => {
      const driver = createDriver(
        <Calendar
          value={new Date()}
          />
      );
      expect(driver.exists()).toBeTruthy();
      expect(console.warn.mock.calls.length).toEqual(1); // eslint-disable-line no-console
    });

    it('should show deprecationLog when the onChange prop is used', () => {
      const driver = createDriver(
        <Calendar
          onChange={() => {}}
          />
      );
      expect(driver.exists()).toBeTruthy();
      expect(console.warn.mock.calls.length).toEqual(1); // eslint-disable-line no-console
    });

    afterAll(() => {
      console.warn = originalConsoleWarn; // eslint-disable-line no-console
    });
  });

  describe('selectedDays prop', () => {
    it('overrides the value prop', () => {
      const NOVEMBER = 10;
      const OCTOBER = 9;
      const value = new Date(2018, NOVEMBER, 1);
      const selectedDays = new Date(2018, OCTOBER, 1);

      const driver = createDriver(
        <Calendar
          value={value}
          selectedDays={selectedDays}
          />
      );
      expect(driver.getMonthCaption()).toEqual('October');
    });
  });

  describe('clicking on a day', () => {
    let onSelectedDaysChange, onChange;

    beforeEach(() => {
      onChange = jest.fn();
      onSelectedDaysChange = jest.fn();
    });
    describe('with selectionMode=\'day\'', () => {
      it('should call onSelectedDaysChange with the clicked day', () => {
        const driver = createDriver(
          <Calendar
            selectedDays={new Date(2018, 10, 5)}
            onSelectedDaysChange={onSelectedDaysChange}
            selectionMode={'day'}
            />
        );

        expect(onSelectedDaysChange.mock.calls.length).toEqual(0);

        driver.clickOnNthDay(0);

        expect(onSelectedDaysChange.mock.calls.length).toEqual(1);
        expect(onSelectedDaysChange.mock.calls[0][0].getDate()).toEqual(1);
      });

      it('should call onChange with the clicked day given onSelectedDaysChange NOT provided', () => {
        const driver = createDriver(
          <Calendar
            selectedDays={new Date(2018, 10, 1)}
            onChange={onChange}
            selectionMode={'day'}
            />
        );

        expect(onChange.mock.calls.length).toEqual(0);

        driver.clickOnNthDay(0);

        expect(onChange.mock.calls.length).toEqual(1);
        expect(onChange.mock.calls[0][0].getDate()).toEqual(1);
      });
    });

    describe('with selectionMode=\'range\'', () => {
      it('should call onSelectedDaysChange({from : clicked day}) when selectedDays is undefined', () => {
      });

      it('should call onSelectedDaysChange({from : clicked day}) when selectedDays is a Range', () => {
      });

      it('will fire onSelectedDaysChange with just {from} if selectedDays isn\'t just {from}...', () => {
        const driver = createDriver(
          <Calendar
            selectedDays={new Date(2018, 10, 5)}
            onSelectedDaysChange={onSelectedDaysChange}
            selectionMode={'range'}
            />
        );

        driver.clickOnNthDay(0);
        expect(onSelectedDaysChange.mock.calls.length).toEqual(1);
        expect(onSelectedDaysChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it(`should call onSelectedDaysChange() with clicked day as the 'to' when selectedDays has 'from' only`, () => {
        const driver = createDriver(
          <Calendar
            selectedDays={{from: new Date(2018, 10, 1)}}
            onSelectedDaysChange={onSelectedDaysChange}
            selectionMode={'range'}
            />
        );

        driver.clickOnNthDay(2);
        expect(onSelectedDaysChange.mock.calls.length).toEqual(1);
        expect(onSelectedDaysChange.mock.calls[0][0].from.getDate()).toEqual(1);
        expect(onSelectedDaysChange.mock.calls[0][0].to.getDate()).toEqual(3);
      });

      it('should call onChange given onSelectedDaysChange NOT provided', () => {
        const driver = createDriver(
          <Calendar
            selectedDays={new Date(2018, 10, 5)}
            onChange={onChange}
            selectionMode={'range'}
            />
        );

        driver.clickOnNthDay(0);
        expect(onChange.mock.calls.length).toEqual(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

    });
  });
});
