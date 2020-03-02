import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import InputGroup from './InputGroup';
import InputGroupAddon from './InputGroupAddon';

/**
 * In the case where the user enters an extra "." at the end of the input the default behavior will
 * be to remove the original decimal point and keep the new one, resulting in the value being
 * multiplied by 100.  If we detect an additional decimal point we can ignore the extra character.
 */
function preventMultipleDecimalPoint(conformedValue, config) {
  let result = conformedValue;
  if (config.rawValue.match(/\..*\./)) {
    result = config.previousConformedValue;
  }
  return result;
}

// TODO support I18n
const CurrencyInput = ({
  allowDecimal,
  allowNegative,
  className,
  includeThousandsSeparator,
  inputProps,
  size,
  state,
  type,
  ...props
}) => {
  const inputClassNames = classnames('form-control', inputProps && inputProps.className);

  const maskedProps = {
    ...inputProps,
    ...props,
    className: inputClassNames,
    // There is a weird bug in the MaskedInput where if the "value" prop gets set to null the
    // input value gets set to "_".  Setting guide to false instead of undefined solves the
    // problem.
    guide: false,
    mask: createNumberMask({
      allowDecimal,
      allowNegative,
      includeThousandsSeparator,
      prefix: ''
    }),
    pipe: preventMultipleDecimalPoint
  };

  return (
    <InputGroup size={size} className={className}>
      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
      <MaskedInput {...maskedProps} />
    </InputGroup>
  );
};

CurrencyInput.defaultProps = {
  allowDecimal: true,
  allowNegative: false,
  includeThousandsSeparator: true,
};

CurrencyInput.propTypes = {
  allowDecimal: PropTypes.bool,
  allowNegative: PropTypes.bool,
  className: PropTypes.string,
  includeThousandsSeparator: PropTypes.bool,
  inputProps: PropTypes.object,
  size: PropTypes.string,
  state: PropTypes.any,
  type: PropTypes.any
};


export default CurrencyInput;
