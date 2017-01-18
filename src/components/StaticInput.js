import React from 'react';
import { Input } from 'reactstrap';

const StaticInput = ({ type, value, defaultValue, children, color, state, ...props }) => (
  <Input
    static
    children={value || defaultValue}
    state={color || state}
    {...props}
  />
);

export default StaticInput;
