import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  onInputChange = (e) => {
    let value = e.currentTarget.value;
    if (typeof this.props.filter === 'function') {
      value = this.props.filter(value);
    }
    this.setState({ value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  }
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
    } = this.props;
    const {
      value,
    } = this.state;
    return (
      <div
        className={classnames(
          styles.root,
          className,
          invalid && styles.invalid,
        )}>
        <input
          onChange={this.onInputChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          pattern={pattern}
          maxLength={maxLength}
          name={name}
          value={value || ''}
          defaultValue={defaultValue}
          className={styles.input}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
}

// function TextInput({
//   className,
//   invalid,
//   onChange,
//   placeholder,
//   disabled,
//   readOnly,
//   pattern,
//   name,
//   maxLength,
//   value,
//   defaultValue,
//   onKeyDown,
// }) {
//   return (
//     <div
//       className={classnames(
//         styles.root,
//         className,
//         invalid && styles.invalid,
//       )}>
//       <input
//         onChange={onChange}
//         placeholder={placeholder}
//         disabled={disabled}
//         readOnly={readOnly}
//         pattern={pattern}
//         maxLength={maxLength}
//         name={name}
//         value={value || ''}
//         defaultValue={defaultValue}
//         className={styles.input}
//         onKeyDown={onKeyDown}
//       />
//     </div>
//   );
// }
TextInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  invalid: PropTypes.bool,
  onKeyDown: PropTypes.func,
  filter: PropTypes.func,
};
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
};

export default TextInput;
