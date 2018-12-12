import React from 'react';
import queryString from 'query-string';
import pick from 'lodash/pick';

import { storiesOf } from '@storybook/react';
import { getTestStoryKind, Category } from '../storiesHierarchy';
import Calendar from 'wix-style-react/Calendar';

storiesOf(
  getTestStoryKind({ category: Category.INPUTS, storyName: '3.13 Calendar' }),
  module,
).add('1. selectedDays', () => {
  const { selectedDays, numOfMonths } = pick(
    queryString.parse(window.location.search),
    ['selectedDays', 'numOfMonths'],
  );

  const obj = selectedDays
    ? JSON.parse(selectedDays)
    : JSON.parse(JSON.stringify(new Date()));
  let value;
  if (typeof obj === 'object') {
    value = {};
    value.from = obj.from && new Date(Date.parse(obj.from));
    value.to = obj.to && new Date(Date.parse(obj.to));
  } else {
    value = new Date(Date.parse(obj));
  }
  return (
    <div>
      <Calendar
        dataHook="calendar"
        value={value}
        numOfMonths={numOfMonths}
        onChange={() => void 0}
      />
    </div>
  );
});
