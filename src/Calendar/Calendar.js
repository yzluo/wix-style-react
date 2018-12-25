import styles from './Calendar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker/DayPicker';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import minBy from 'lodash/minBy';
import WixComponent from '../BaseComponents/WixComponent';
import localeUtilsFactory from '../LocaleUtils';
import DatePickerHead from './DatePickerHead';

export default class Calendar extends WixComponent {
  static displayName = 'Calendar';

  static defaultProps = {
    locale: 'en',
    className: '',
    filterDate: () => true,
    shouldCloseOnSelect: true,
    onClose: () => {},
    numOfMonths: 1,
  };

  constructor(props) {
    super(props);

    const initialMonth = Calendar.getNextMonth(props.value, props.numOfMonths);
    this.state = {
      month: initialMonth || new Date(),
    };
  }

  static dateToMonth(date) {
    return date ? date.getFullYear() * 100 + date.getMonth() : null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const month = Calendar.getNextMonth(
        nextProps.value,
        nextProps.numOfMonths,
        this.state.month,
      );
      if (month) {
        this.setState({ month });
      }
    }
  }

  static renderDay(day, modifiers) {
    const relevantModifiers = ['start', 'end', 'selected'];
    for (const modifier of relevantModifiers) {
      if (modifier in modifiers) {
        return (
          <div
            className={styles.dayCircle}
            data-date={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
          >
            {day.getDate()}
          </div>
        );
      }
    }

    return (
      <div
        data-date={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
      >
        {day.getDate()}
      </div>
    );
  }

  _setMonth = month => {
    this.setState({ month });
  };

  _handleDayClick = (value, modifiers = {}) => {
    const propsValue = this.props.value || {};
    const { onChange, shouldCloseOnSelect } = this.props;

    if (this.props.selectionMode === 'range') {
      if (
        (!propsValue.from && !propsValue.to) ||
        (propsValue.from && propsValue.to)
      ) {
        onChange({ from: value }, modifiers);
      } else {
        const anchor = propsValue.from || propsValue.to;
        const newVal =
          anchor < value
            ? { from: anchor, to: value }
            : { from: value, to: anchor };

        onChange(newVal, modifiers);
        shouldCloseOnSelect && this.props.onClose();
      }
    } else {
      onChange(value, modifiers);
      shouldCloseOnSelect && this.props.onClose();
    }
  };

  static optionalParse = dateOrString =>
    typeof dateOrString === 'string' ? parse(dateOrString) : dateOrString;

  static parseValue = value => {
    if (!value) {
      return new Date();
    }
    if (typeof value === 'string') {
      return parse(value);
    } else if (value instanceof Date) {
      return value;
    } else {
      return {
        from: Calendar.optionalParse(value.from),
        to: Calendar.optionalParse(value.to),
      };
    }
  };

  static isSingleDay(value) {
    return value instanceof Date;
  }

  static dateMonthDiff = (b, a) => {
    const yearA = Math.floor(a / 100);
    const yearB = Math.floor(b / 100);
    const monthA = a % 100;
    const monthB = b % 100;
    return monthB - monthA + 12 * (yearB - yearA);
  };

  static getMonthShiftToView = (month, numOfMonths, currentMonth) => {
    if (!currentMonth) {
      return 0;
    }
    const monthsDiff = Calendar.dateMonthDiff(month, currentMonth);
    if (monthsDiff < 0) {
      return 0;
    } else if (monthsDiff >= numOfMonths) {
      return 1 - numOfMonths;
    }
    return false;
  };

  static getMonthReturnValue = (dateValue, numOfMonths, currentMonth) => {
    const toMonth = Calendar.dateToMonth(dateValue);
    const returnValue = new Date(dateValue);
    const shiftValue = Calendar.getMonthShiftToView(
      toMonth,
      numOfMonths,
      currentMonth,
    );
    if (shiftValue !== false) {
      returnValue.setMonth(returnValue.getMonth() + shiftValue);
      return returnValue;
    }
    return null;
  };

  static getShiftValueToMaxOverlap = (
    from,
    to,
    numOfMonths,
    currentMonthDate,
  ) => {
    const frameStart = Calendar.dateToMonth(currentMonthDate);
    const frameEndDate = new Date(currentMonthDate);
    frameEndDate.setMonth(frameEndDate.getMonth() + numOfMonths - 1);
    const frameEnd = Calendar.dateToMonth(frameEndDate);

    const fromDiffStart = Calendar.dateMonthDiff(from, frameStart);
    const fromDiffEnd = Calendar.dateMonthDiff(from, frameEnd);
    const toDiffStart = Calendar.dateMonthDiff(to, frameStart);
    const toDiffEnd = Calendar.dateMonthDiff(to, frameEnd);

    if (fromDiffStart >= 0 && toDiffEnd <= 0) {
      return 0;
    }

    if (fromDiffEnd > 0) {
      return (
        fromDiffEnd -
        1 +
        Math.min(numOfMonths, Calendar.dateMonthDiff(to, from) + 1)
      );
    } else if (toDiffStart < 0) {
      return (
        toDiffStart +
        1 -
        Math.min(numOfMonths, Calendar.dateMonthDiff(to, from) + 1)
      );
    } else {
      return minBy([fromDiffStart, toDiffEnd], Math.abs);
    }
  };

  static getNextMonth = (nextPropsValue, numOfMonths, currentMonthDate) => {
    const nextValue = Calendar.parseValue(nextPropsValue);
    const currentMonth = Calendar.dateToMonth(currentMonthDate);

    if (Calendar.isSingleDay(nextValue)) {
      return Calendar.getMonthReturnValue(nextValue, numOfMonths, currentMonth);
    } else {
      const fromMonth = Calendar.dateToMonth(nextValue.from);
      const toMonth = Calendar.dateToMonth(nextValue.to);
      if (fromMonth && toMonth) {
        const returnValue = new Date(currentMonthDate || null);
        returnValue.setMonth(
          returnValue.getMonth() +
            Calendar.getShiftValueToMaxOverlap(
              fromMonth,
              toMonth,
              numOfMonths,
              currentMonthDate,
            ),
        );
        return returnValue;
      } else if (fromMonth) {
        return Calendar.getMonthReturnValue(
          nextValue.from,
          numOfMonths,
          currentMonth,
        );
      } else if (toMonth) {
        return Calendar.getMonthReturnValue(
          nextValue.to,
          numOfMonths,
          currentMonth,
        );
      }
    }
  };

  _getSelectedDays(value) {
    const { from, to } = value || {};
    if (from && to) {
      return { from: from, to: to };
    } else if (from) {
      return { after: prevDay(from) };
    } else if (to) {
      return { before: nextDay(to) };
    } else {
      // Single day OR empty value
      return value;
    }
  }

  _createCaptionElement = month => {
    const { locale, showMonthDropdown, showYearDropdown } = this.props;

    const localeUtils = localeUtilsFactory(locale);

    return (
      <DatePickerHead
        {...{
          date: month,
          showYearDropdown,
          showMonthDropdown,
          localeUtils,
          onChange: this._setMonth,
          onLeftArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, -1))),
          onRightArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, 1))),
        }}
      />
    );
  };

  _createDayPickerProps = () => {
    const { locale, filterDate, excludePastDates, numOfMonths } = this.props;

    const value = Calendar.parseValue(this.props.value);

    const month = this.state.month;
    const localeUtils = localeUtilsFactory(locale);
    const { from, to } = value || {};
    const singleDay = !from && !to && value;

    const firstOfMonth = [
      new Date(month.getFullYear(), month.getMonth(), 1),
      new Date(month.getFullYear(), month.getMonth() + 1, 1),
    ];
    const lastOfMonth = [
      new Date(month.getFullYear(), month.getMonth() + 1, 0),
      new Date(month.getFullYear(), month.getMonth() + 2, 0),
    ];

    const captionElement = this._createCaptionElement(month);
    const selectedDays = this._getSelectedDays(value);

    return {
      disabledDays: excludePastDates
        ? { before: new Date() }
        : date => !filterDate(date),
      initialMonth: month,
      initialYear: month,
      selectedDays,
      month,
      year: month,
      firstDayOfWeek: 1,
      locale: typeof locale === 'string' ? locale : '',
      fixedWeeks: true,
      onKeyDown: this._handleKeyDown,
      onDayClick: this._handleDayClick,
      localeUtils,
      navbarElement: () => null,
      captionElement,
      onDayKeyDown: this._handleDayKeyDown,
      numberOfMonths: numOfMonths,
      className: numOfMonths > 1 ? styles.TwoMonths : '',
      modifiers: { start: from, end: to, firstOfMonth, lastOfMonth, singleDay },
      renderDay: Calendar.renderDay,
    };
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    keyHandler && keyHandler();
  };

  keyHandlers = {
    // escape
    27: this.props.onClose,

    // tab
    9: this.props.onClose,
  };

  _focusSelectedDay = dayPickerRef => {
    if (dayPickerRef) {
      this.dayPickerRef = dayPickerRef;
      const selectedDay = this.dayPickerRef.dayPicker.querySelector(
        '.DayPicker-Day--selected',
      );

      if (selectedDay) {
        selectedDay.classList.add('DayPicker-Day--unfocused');
        selectedDay.focus();
      }
    }
  };

  _handleDayKeyDown = () => {
    const unfocusedDay = this.dayPickerRef.dayPicker.querySelector(
      '.DayPicker-Day--unfocused',
    );

    if (unfocusedDay) {
      unfocusedDay.classList.remove('DayPicker-Day--unfocused');
    }
  };

  render() {
    return (
      <div className={classNames(styles.calendar, this.props.className)}>
        <DayPicker
          ref={this._focusSelectedDay}
          {...this._createDayPickerProps()}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  /** Display multiple months, currently allowing only 1 or 2 */
  numOfMonths: PropTypes.oneOf([1, 2]),

  className: PropTypes.string,

  /** Callback function called with a Date or a Range whenever the user selects a day in the calendar */
  onChange: PropTypes.func.isRequired,

  /** Callback function called whenever user press escape or click outside of the element */
  onClose: PropTypes.func,

  /** Past dates are unselectable */
  excludePastDates: PropTypes.bool,

  /** Only the truthy dates are selectable */
  filterDate: PropTypes.func,

  /** The selected date */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      from: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    }),
  ]),

  /** Whether the user should be able to select a date range, or just a single day */
  selectionMode: PropTypes.oneOf(['day', 'range']),

  /** Display a selectable yearDropdown */
  showYearDropdown: PropTypes.bool,

  /** Display a selectable monthDropdown */
  showMonthDropdown: PropTypes.bool,

  /** should the calendar close on day selection */
  shouldCloseOnSelect: PropTypes.bool,

  /** DatePicker instance locale */
  locale: PropTypes.oneOfType([
    PropTypes.oneOf([
      'en',
      'es',
      'pt',
      'fr',
      'de',
      'pl',
      'it',
      'ru',
      'ja',
      'ko',
      'tr',
      'sv',
      'no',
      'nl',
      'da',
    ]),
    PropTypes.shape({
      distanceInWords: PropTypes.object,
      format: PropTypes.object,
    }),
  ]),
};

function nextDay(date) {
  const day = new Date(date);
  day.setDate(day.getDate() + 1);
  return day;
}

function prevDay(date) {
  const day = new Date(date);
  day.setDate(day.getDate() - 1);
  return day;
}
