import { boolean, number, select } from '@storybook/addon-knobs';
import React from 'react';
import Progress from './Progress';

export default {
  title: 'Progress',
  component: Progress,
};

export const LiveExample = () => (
  <Progress
    color={select('color', ['', 'info', 'success', 'warning', 'danger'], '')}
    animated={boolean('animated', Progress.defaultProps.animated)}
    value={number('value', 50, {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    })}
  />
);
