import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker/DayPicker';
import addMonths from 'date-fns/add_months';
import parse from 'date-fns/parse';
import startOfMonth from 'date-fns/start_of_month';
import addYears from 'date-fns/add_years';

import WixComponent from '../../BaseComponents/WixComponent';
import localeUtilsFactory from '../LocaleUtils';
import DatePickerHead from '../DatePickerHead';
import styles from './Calendar.scss';

/**
 * Calendar component
 *
 * ### Keyboard support
 * * `Left`: Move to the previous day.
 * * `Right`: Move to the next day.
 * * `Up`: Move to the previous week.
 * * `Down`: Move to the next week.
 * * `PgUp`: Move to the previous month.
 * * `PgDn`: Move to the next month.
 * * `Home`: Move to the previous year.
 * * `End`: Move to the next year.
 * * `Enter`/`Esc`/`Tab`: close the calendar. (`Enter` & `Esc` calls `preventDefault`)
 *
 */
export default class Calendar extends WixComponent {
  static displayName = 'Calendar';

  static defaultProps = {
    locale: 'en',
    filterDate: () => true,
    rtl: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isMonthPickerOpen: false,
      isYearPickerOpen: false,
      month: props.value
    };

    this.dayPickerEl = null;
  }

  // TODO: Change to getDerivedStateFromProps with React ^16.0.0
  componentWillReceiveProps(nextProps) {
    this.setState({month: nextProps.value || new Date()});
  }

  _setMonth = (month, callback) => this.setState({month}, callback);

  _handleDayClick = (value, modifiers = {}) => {
    this.props.onChange(value, modifiers);
  };

  _createDayPickerProps = () => {
    const {
      locale,
      showMonthDropdown,
      showYearDropdown,
      filterDate,
      excludePastDates,
      value: propsValue,
      rtl
    } = this.props;

    const month = this.state.month || propsValue;
    const localeUtils = localeUtilsFactory(locale);

    const captionElement = (
      <DatePickerHead
        {...{
          date: month,
          showYearDropdown,
          showMonthDropdown,
          localeUtils,
          rtl,
          onChange: this._setMonth,

          onLeftArrowClick: () => this._setMonth(startOfMonth(addMonths(month, -1))),
          onRightArrowClick: () => this._setMonth(startOfMonth(addMonths(month, 1)))
        }}
        />
    );

    return {
      disabledDays: excludePastDates ? [{before: new Date()}] : date => !filterDate(date),

      initialMonth: month,
      initialYear: month,
      selectedDays: parse(propsValue),
      month,
      year: month,
      firstDayOfWeek: 1,
      locale: typeof locale === 'string' ? locale : '',
      fixedWeeks: true,
      onKeyDown: this._handleKeyDown,
      onDayKeyDown: this._handleDayKeyDown,
      onDayClick: this._handleDayClick,
      localeUtils,
      navbarElement: () => null,
      captionElement
    };
  };

  _focusCalendarDay = day => {
    if (this.dayPickerEl) {
      const currentDateIndex = day.getDate() - 1;
      const dayElements = this.dayPickerEl.querySelectorAll('.DayPicker-Day:not(.DayPicker-Day--outside)');

      if (dayElements && dayElements.length) {
        dayElements[currentDateIndex].focus();
      }
    }
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    keyHandler && keyHandler();
  };

  _handleDayKeyDown = (day, modifiers, event) => {
    const dayKeyModifier = this.dayKeyHandlerModifiers[event.keyCode];

    if (dayKeyModifier) {
      event.preventDefault();
      this._setMonth(dayKeyModifier(day), () => this._focusCalendarDay(day));
    }
  }

  keyHandlers = {
    // escape
    27: this.props.onClose,

    // tab
    9: this.props.onClose
  };

  dayKeyHandlerModifiers = {
    // page up
    33: value => addMonths(value, -1),

    // page down
    34: value => addMonths(value, 1),

    // end
    35: value => addYears(value, 1),

    // home
    36: value => addYears(value, -1)
  };

  _initPickerRefAndFocusSelectedDay = dayPickerRef => {
    if (dayPickerRef) {
      this.dayPickerEl = dayPickerRef.dayPicker;
      this._focusCalendarDay(this.props.value || new Date());
    }
  }

  render() {
    const {visible} = this.props;

    return (
      <div className={styles.root}>
        {visible &&
          <DayPicker
            ref={this._initPickerRefAndFocusSelectedDay}
            {...this._createDayPickerProps()}
            />
        }
      </div>
    );
  }
}

Calendar.propTypes = {
  /** Should show or hide the component */
  visible: PropTypes.bool,

  /** Callback function called whenever the user selects a day in the calendar */
  onChange: PropTypes.func.isRequired,

  /** Callback function called whenever user press escape or click outside of the element */
  onClose: PropTypes.func,

  /** Past dates are unselectable */
  excludePastDates: PropTypes.bool,

  /** Only the truthy dates are selectable */
  filterDate: PropTypes.func,

  /** RTL mode */
  rtl: PropTypes.bool,

  /** The selected date */
  value: PropTypes.object,

  /** Display a selectable yearDropdown */
  showYearDropdown: PropTypes.bool,

  /** Display a selectable monthDropdown */
  showMonthDropdown: PropTypes.bool,

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
      'da'
    ]),
    PropTypes.shape({
      distanceInWords: PropTypes.object,
      format: PropTypes.object
    })
  ])
};
