import deepCopy from 'deep-clone-simple';
import noop from 'lodash.noop';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import HasManyFieldsAdd from './HasManyFieldsAdd';
import HasManyFieldsRow from './HasManyFieldsRow';

class HasManyFields extends Component {
  static propTypes = {
    blank: PropTypes.any,
    defaultValue: PropTypes.array,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func,
    onChange: PropTypes.func,
    template: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
      .isRequired,
    value: PropTypes.array
  };

  static defaultProps = {
    defaultValue: [],
    onAdd: noop,
    onRemove: noop,
    onUpdate: noop,
    onChange: noop
  };

  constructor(props) {
    super(props);

    this.isUncontrolled = typeof props.value === 'undefined';

    if (this.isUncontrolled) {
      this.state = {
        value: deepCopy(props.defaultValue)
      };
    }

    this.rowRefs = [];
  }

  get value() {
    return this.isUncontrolled ? this.state.value : this.props.value;
  }

  set value(value) {
    this.props.onChange(value);
    this.isUncontrolled && this.setState({ value });
  }

  withCopiedValue = func => {
    const val = deepCopy(this.value);
    func(val);
    this.value = val;
  };

  updateItem = i => update => {
    this.props.onUpdate(i, update);
    this.withCopiedValue(v => (v[i] = update));
  };

  addItem = () => {
    this.props.onAdd();
    this.withCopiedValue(v => {
      const blank =
        typeof this.props.blank === 'function'
          ? this.props.blank(v)
          : this.props.blank;
      v.push(blank);
    });
    setTimeout(() => this.focusRow(this.rowRefs.length - 1));
  };

  deleteItem = i => () => {
    this.props.onRemove(i);
    this.withCopiedValue(v => v.splice(i, 1));
    setTimeout(() => this.focusRow(this.value.length > i ? i : i - 1));
  };

  setRowReference = index => rowTemplate => {
    this.rowRefs[index] = rowTemplate;

    if (this.rowRefs.every(row => row === null)) {
      this.rowRefs = [];
    }
  };

  focusRow = index => {
    const row = this.rowRefs[index];
    if (!row) {
      return;
    }
    const el = ReactDOM.findDOMNode(row);
    const firstInput = el.querySelectorAll('input, select, textarea')[0];
    firstInput && firstInput.focus();
  };

  render() {
    const { template: Template, label, disabled } = this.props;

    return (
      <div>
        {this.value.map((item, i, items) =>
          <HasManyFieldsRow
            onDelete={this.deleteItem(i)}
            key={`${i}/${items.length}`}
            disabled={disabled}
          >
            <Template
              value={item}
              onChange={this.updateItem(i)}
              ref={this.setRowReference(i)}
              disabled={disabled}
            />
          </HasManyFieldsRow>
        )}

        <HasManyFieldsAdd onClick={this.addItem} disabled={disabled}>
          {label}
        </HasManyFieldsAdd>
      </div>
    );
  }
}

export default HasManyFields;
