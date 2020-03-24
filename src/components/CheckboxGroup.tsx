import React from 'react';
import FormGroup from './FormGroup';
import Label from './Label';
import Input from './Input';

type Value = any;
interface Option {
  label: string;
  value: Value;
}

export interface CheckboxGroupProps {
  options: Option[];
  selected: Set<Value>;
  onChange: (values: Set<Value>) => void;
}

const CheckboxGroup = ({ options, selected, onChange }: CheckboxGroupProps) => {
  const handleCheckboxChange = (checked: boolean, value: Value) => {
    const newSelected = new Set(selected);

    if (checked) {
      newSelected.add(value);
    } else {
      newSelected.delete(value);
    }

    onChange(newSelected);
  };

  return (
    <FormGroup>
      {
        options.map(option => (
          <FormGroup check key={option.value}>
            <Label check>
              <Input
                type="checkbox"
                checked={selected.has(option.value)}
                onChange={ev => handleCheckboxChange(ev.target.checked, option.value)}
              />{' '}{option.label}
            </Label>
          </FormGroup>
        ))
      }
    </FormGroup>
  );
};

export default CheckboxGroup;
