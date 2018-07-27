import React from 'react';
import Calendar from '../../src/DatePicker/Calendar';
import isBefore from 'date-fns/is_before';
import isSameDay from 'date-fns/is_same_day';

class RangedDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null
    };
  }

  _addDateToRange({from, to}, value) {
    let range = {from, to};

    if (!from) {
      range = {from: value, to: value};
    } else if (isBefore(value, from)) {
      range.from = value;
    } else if (isSameDay(value, to) && isSameDay(value, from)) {
      range = {from: null, to: null};
    } else if (isSameDay(value, to)) {
      range.from = to;
    } else {
      range.to = value;
    }
    return range;
  }

  handleChange = value => {
    const {from, to} = this.state;

    this.setState(this._addDateToRange({from, to}, value));
  }

  render() {
    const {from, to} = this.state;

    return (
      <div style={{width: 300}}>
        <Calendar
          dataHook="story-range-controlled"
          onChange={this.handleChange}
          placeholder="Choose a range of dates"
          range={{from, to}}
          visible
          />
      </div>
    );
  }
}

export default () =>
  <div className="ltr">
    <RangedDatePicker/>
  </div>;
