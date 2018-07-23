import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';

import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';
import styles from './styles.scss';

const caption = (text, dataHook) => (
  <div data-hook={dataHook} className={styles.caption} children={text} />
);

const getMonthName = (months, month) => months[month] || months[0];

const DatePickerHead = ({
  date,
  localeUtils,
  onChange,
  onLeftArrowClick,
  onRightArrowClick,
  showMonthDropdown,
  showYearDropdown,
}) => {
  return (
    <div data-hook="datepicker-head" className={styles.root}>
      <div
        className={classnames(styles.arrow, styles.arrowLeft)}
        data-hook="datepicker-left-arrow"
        onClick={onLeftArrowClick}
      >
        <ChevronLeft className={styles.arrowIcon} />
      </div>

      {showMonthDropdown ? (
        <MonthDropdown
          date={date}
          onChange={onChange}
          months={localeUtils.getMonths()}
        />
      ) : (
        caption(
          getMonthName(localeUtils.getMonths(), date.getMonth()),
          'datepicker-month-caption',
        )
      )}

      {showYearDropdown ? (
        <YearDropdown date={date} onChange={onChange} />
      ) : (
        caption(date.getFullYear(), 'datepicker-year-caption')
      )}

      <div
        className={classnames(styles.arrow, styles.arrowRight)}
        data-hook="datepicker-right-arrow"
        onClick={onRightArrowClick}
      >
        <ChevronRight className={styles.arrowIcon} />
      </div>
    </div>
  );
};

DatePickerHead.propTypes = {
  date: PropTypes.object.isRequired,
  localeUtils: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onLeftArrowClick: PropTypes.func.isRequired,
  onRightArrowClick: PropTypes.func.isRequired,
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
};

export default DatePickerHead;
