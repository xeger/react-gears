import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import MonthCalendar from './MonthCalendar';

export default {
  title: 'Calendar',
  component: MonthCalendar,
};

export const MonthCalendarExample = () => {
  const [date, setDate] = useState(new Date());
  return (
    <MonthCalendar
      date={date}
      onSelect={(e) => {
        setDate(e);
        action('onSelect')(e);
      }}
      centerYearSelection={boolean('Center Year Selection', false)}
      monthFormat={select('Month Format', ['M', 'MM', 'MMM', 'MMMM'], 'MMM')}
      yearFormat={select('Year Format', ['YY', 'YYYY'], 'YYYY')}
    />
  );
};
