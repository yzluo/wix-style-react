//file.only
import React from 'react';
import calendarDriverFactory from './Calendar.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import Calendar from './Calendar';
import { createRendererWithDriver, cleanup } from '../../test/utils/react';

const createDriver = createDriverFactory(calendarDriverFactory);

describe('Calendar', () => {
  afterEach(() => cleanup());

  const SEPTEMBER = 8,
    OCTOBER = 9,
    NOVEMBER = 10,
    DECEMBER = 11;

  const monthNames = 'January February March April May June July August September October November December'.split(
    ' ',
  );

  describe('rendering the Calendar', () => {
    it('should display the month of the {from} Date if the provided value is {from, to}', () => {
      const driver = createDriver(
        <Calendar
          value={{
            from: new Date(2018, OCTOBER, 5),
            to: new Date(2018, NOVEMBER, 7),
          }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {from} Date if the provided value is {from, to} with date strings', () => {
      const driver = createDriver(
        <Calendar
          value={{ from: '2018/10/05', to: '2018/11/07' }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {from} Date if the provided value is {from}', () => {
      const driver = createDriver(
        <Calendar
          value={{ from: new Date(2018, OCTOBER, 5) }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {from} Date if the provided value is {from} with a date string', () => {
      const driver = createDriver(
        <Calendar value={{ from: '2018/10/05' }} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {to} Date if the provided value is {to}', () => {
      const driver = createDriver(
        <Calendar
          value={{ to: new Date(2018, NOVEMBER, 7) }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the month of the {to} Date if the provided value is {to} with a date string', () => {
      const driver = createDriver(
        <Calendar value={{ to: '2018/11/07' }} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the month of the Date if the provided value is a single Date', () => {
      const driver = createDriver(
        <Calendar value={new Date(2018, NOVEMBER, 7)} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the month of the Date if the provided value is a single date string', () => {
      const driver = createDriver(
        <Calendar value={'2018/11/07'} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the current month if the provided value is undefined', () => {
      const driver = createDriver(<Calendar onChange={() => {}} />);

      expect(driver.getMonthCaption()).toEqual(
        monthNames[new Date().getMonth()],
      );
    });

    it('should display the current month if the provided value is an empty object', () => {
      const driver = createDriver(<Calendar value={{}} onChange={() => {}} />);

      expect(driver.getMonthCaption()).toEqual(
        monthNames[new Date().getMonth()],
      );
    });
  });

  describe('clicking on a day', () => {
    let onChange;

    beforeEach(() => {
      onChange = jest.fn();
    });
    describe("with selectionMode='day'", () => {
      it('should call onChange with the clicked day', () => {
        const date = new Date(2018, 10, 5);
        const driver = createDriver(
          <Calendar value={date} onChange={onChange} selectionMode={'day'} />,
        );

        expect(onChange).toHaveBeenCalledTimes(0);

        driver.clickDay(new Date(2018, 10, 1));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].getDate()).toEqual(1);
      });
    });

    describe("with selectionMode='range'", () => {
      it('should call onChange({from: $clickedDay}) when value is undefined', () => {
        const driver = createDriver(
          <Calendar onChange={onChange} selectionMode={'range'} />,
        );

        driver.clickOnNthDay(0);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it('should call onChange({from: $clickedDay}) when value is a Range', () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 5), to: new Date(2018, 10, 10) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it('should call onChange({from: $clickedDay}) when value is a single Date', () => {
        const driver = createDriver(
          <Calendar
            value={new Date(2018, 10, 5)}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it(`should call onChange({from: $from, to: $clickedDay}) when value has only 'from'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 1) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(2);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(3);
      });

      it(`should call onChange({from: $clickedDay, to: $to}) when a day is clicked, given only 'to'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ to: new Date(2018, 10, 3) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(3);
      });
      it(`should call onChange({from: $clickedDay, to: $from}) if the clicked day is earlier than the provided 'from'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 10) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(10);
      });

      it(`should call onChange({from: $clickedDay, to: $from}) when a day is clicked, given only 'from'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 10) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(2);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(3);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(10);
      });
    });
  });

  describe('rerender with new value prop', () => {
    describe('month state', () => {
      const render = createRendererWithDriver(calendarDriverFactory);

      function testCase({
        initialValue,
        nextValue,
        expectedInitialMonth,
        expectedMonth,
        numOfMonths = 1,
      }) {
        const { driver, rerender } = render(
          <Calendar
            numOfMonths={numOfMonths}
            value={initialValue}
            onChange={() => {}}
          />,
        );
        expect(driver.getMonthCaption()).toEqual(
          monthNames[expectedInitialMonth],
        );
        rerender(
          <Calendar
            numOfMonths={numOfMonths}
            value={nextValue}
            onChange={() => {}}
          />,
        );
        expect(driver.getMonthCaption()).toEqual(monthNames[expectedMonth]);
      }

      describe('2 months view', () => {
        it('should not change the displayed month, provided that the new month is the following month', () => {
          testCase({
            initialValue: new Date(2018, OCTOBER, 1),
            expectedInitialMonth: OCTOBER,
            nextValue: new Date(2018, NOVEMBER, 1),
            expectedMonth: OCTOBER,
            numOfMonths: 2,
          });
        });

        it('should change the displayed month, provided that the new month more than one month away from the current month', () => {
          testCase({
            initialValue: new Date(2018, OCTOBER, 1),
            expectedInitialMonth: OCTOBER,
            nextValue: new Date(2018, DECEMBER, 1),
            expectedMonth: NOVEMBER,
            numOfMonths: 2,
          });
        });

        it('should change the displayed month, provided that the new month is before the current month', () => {
          testCase({
            initialValue: new Date(2018, OCTOBER, 1),
            expectedInitialMonth: OCTOBER,
            nextValue: new Date(2018, SEPTEMBER, 1),
            expectedMonth: SEPTEMBER,
            numOfMonths: 2,
          });
        });
        it('should not change the displayed month, provided that the to month is shown', () => {
          testCase({
            initialValue: new Date(2018, OCTOBER, 1),
            expectedInitialMonth: OCTOBER,
            nextValue: {
              from: new Date(2018, SEPTEMBER, 1),
              to: new Date(2018, NOVEMBER, 1),
            },
            expectedMonth: OCTOBER,
            numOfMonths: 2,
          });
        });
        it('should change the month to contain most of the range', () => {
          testCase({
            initialValue: new Date(2018, OCTOBER, 1),
            expectedInitialMonth: OCTOBER,
            nextValue: {
              from: new Date(2018, NOVEMBER, 1),
              to: new Date(2018, DECEMBER, 1),
            },
            expectedMonth: NOVEMBER,
            numOfMonths: 2,
          });
        });
      });

      it('should not change the displayed month, provided that current month contains the new Date', () => {
        testCase({
          initialValue: new Date(2018, OCTOBER, 1),
          expectedInitialMonth: OCTOBER,
          nextValue: new Date(2018, OCTOBER, 2),
          expectedMonth: OCTOBER,
        });
      });

      it('should change the displayed month, provided that the current month is earlier than the new Date', () => {
        testCase({
          initialValue: new Date(2018, OCTOBER, 1),
          expectedInitialMonth: OCTOBER,
          nextValue: new Date(2018, NOVEMBER, 1),
          expectedMonth: NOVEMBER,
        });
      });

      it('should change the displayed month, provided that the current month is later than the new Date', () => {
        testCase({
          initialValue: new Date(2018, OCTOBER, 1),
          expectedInitialMonth: OCTOBER,
          nextValue: new Date(2018, SEPTEMBER, 1),
          expectedMonth: SEPTEMBER,
        });
      });

      it('should change the displayed month, provided that the current month is contained in the new Range', () => {
        testCase({
          initialValue: new Date(2018, OCTOBER, 1),
          expectedInitialMonth: OCTOBER,
          nextValue: {
            from: new Date(2018, SEPTEMBER, 1),
            to: new Date(2018, NOVEMBER, 1),
          },
          expectedMonth: SEPTEMBER,
        });
      });

      it('should move the displayed month forward, provided that the current month is earlier than the new Range', () => {
        testCase({
          initialValue: new Date(2018, SEPTEMBER, 1),
          expectedInitialMonth: SEPTEMBER,
          nextValue: {
            from: new Date(2018, OCTOBER, 1),
            to: new Date(2018, NOVEMBER, 1),
          },
          expectedMonth: OCTOBER,
        });
      });

      it('numOfMonths=2 - should not move the displayed month forward, provided that the to month one month after the current month', () => {
        testCase({
          initialValue: new Date(2018, SEPTEMBER, 1),
          expectedInitialMonth: SEPTEMBER,
          nextValue: {
            from: new Date(2018, OCTOBER, 1),
            to: new Date(2018, OCTOBER, 4),
          },
          numOfMonths: 2,
          expectedMonth: SEPTEMBER,
        });
      });

      it('should move the displayed month forward, provided that the current month is earlier than the new unbounded Range', () => {
        testCase({
          initialValue: new Date(2018, SEPTEMBER, 1),
          expectedInitialMonth: SEPTEMBER,
          nextValue: {
            from: new Date(2018, OCTOBER, 1),
          },
          expectedMonth: OCTOBER,
        });
      });

      it('should move the displayed month back, provided that the current month is later than the new Range', () => {
        testCase({
          initialValue: new Date(2018, NOVEMBER, 1),
          expectedInitialMonth: NOVEMBER,
          nextValue: {
            from: new Date(2018, SEPTEMBER, 1),
            to: new Date(2018, OCTOBER, 1),
          },
          expectedMonth: OCTOBER,
        });
      });

      it('should move the displayed month back, provided that the current month is later than the new unbounded Range', () => {
        testCase({
          initialValue: new Date(2018, NOVEMBER, 1),
          expectedInitialMonth: NOVEMBER,
          nextValue: {
            to: new Date(2018, OCTOBER, 1),
          },
          expectedMonth: OCTOBER,
        });
      });

      it('should not change when nextValue is empty', () => {
        testCase({
          initialValue: new Date(2018, NOVEMBER, 1),
          expectedInitialMonth: NOVEMBER,
          nextValue: {},
          expectedMonth: NOVEMBER,
        });
      });
    });
  });
});
