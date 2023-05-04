import React, { Component } from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type TextInputProps = {
  className?: string;
  onChange?: (...args: any[]) => any;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  pattern?: string;
  maxLength?: number;
  name?: string;
  value?: string;
  defaultValue?: string;
  invalid?: boolean;
  onKeyDown?: (...args: any[]) => any;
  filter?: (...args: any[]) => any;
  autoFocus?: boolean;
  inputClassName?: string;
  dataSign?: string;
};
type TextInputState = {
  value: any;
};
class TextInput extends Component<TextInputProps, TextInputState> {
  input: any;
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.input = null;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  onInputChange = (e: any) => {
    let value = e.currentTarget.value;
    if (typeof this.props.filter === 'function') {
      value = this.props.filter(value);
    }
    this.setState({ value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      className,
      invalid,
      placeholder,
      disabled,
      readOnly,
      pattern,
      name,
      maxLength,
      defaultValue,
      onKeyDown,
      autoFocus,
    } = this.props;
    const { value } = this.state;
    return (
      <div
        className={classnames(
          styles.root,
          className,
          invalid && styles.invalid,
        )}
      >
        <input
          data-sign={this.props.dataSign}
          autoFocus={autoFocus} // eslint-disable-line
          ref={(input) => {
            this.input = input;
          }}
          onChange={this.onInputChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          pattern={pattern}
          maxLength={maxLength}
          name={name}
          value={value || ''}
          defaultValue={defaultValue}
          className={classnames(styles.input, this.props.inputClassName)}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
TextInput.defaultProps = {
  className: undefined,
  onChange: undefined,
  placeholder: undefined,
  disabled: false,
  readOnly: false,
  pattern: undefined,
  maxLength: undefined,
  name: undefined,
  value: undefined,
  defaultValue: undefined,
  invalid: false,
  onKeyDown: undefined,
  filter: undefined,
  autoFocus: false,
  inputClassName: undefined,
  dataSign: undefined,
};
export default TextInput;
