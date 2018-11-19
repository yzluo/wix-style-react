import React from 'react';
import Calendar from '../../src/Calendar';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Label from 'wix-style-react/Label';

class ControlledCalendarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date('2017/05/01'),
      selectedDays: {to: new Date('2018/11/14')},
      excludePastDates: false,
      selectionMode: 'range'
    };
  }

  onSelectedDaysChange(selectedDays) {
    this.setState({selectedDays});
  }

  toggleExclude() {
    this.setState(({excludePastDates}) => ({excludePastDates: !excludePastDates}));
  }

  toggleSelectionMode() {
    this.setState({selectionMode: this.state.selectionMode === 'day' ? 'range' : 'day'});
  }

  render() {
    return (
      <div>
        <Calendar
          excludePastDates={this.state.excludePastDates}
          onSelectedDaysChange={selectedDays => this.onSelectedDaysChange(selectedDays)}
          selectedDays={this.state.selectedDays}
          selectionMode={this.state.selectionMode}
          />
        <div style={{display: 'flex'}}>
          <ToggleSwitch
            checked={this.state.excludePastDates}
            onChange={() => this.toggleExclude()}
            />
          <Label>Exclude Past Days</Label>
        </div>
        <div style={{display: 'flex'}}>
          <ToggleSwitch
            checked={this.state.selectionMode === 'day'}
            onChange={() => this.toggleSelectionMode()}
            />
          <Label>Selection Mode: {this.state.selectionMode === 'day' ? 'Single day' : 'Date range'}</Label>
        </div>
      </div>
    );
  }
}

export default () => <ControlledCalendarExample/>;
