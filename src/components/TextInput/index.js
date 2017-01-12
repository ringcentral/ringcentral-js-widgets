import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class TextInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: (props.value) ? props.value : ''
    };
  }

  render() {
    const props = this.props;
    // console.debug('class',props.className);
    return (
      <div
        className={classnames(
          styles.root,
          props.className,
          props.invalid && styles.invalid,
          )}>
        <input
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readOnly={props.readOnly}
          pattern={props.pattern}
          maxLength={props.maxLength}
          name={props.name}
          value={props.value}
          defaultValue={props.defaultValue}
          className={classnames(styles.input)}
          onKeyDown={props.onKeyDown}
        />
      </div>
    );
  }
}

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
};
TextInput.defaultValue = {
  className: styles.input
};


export default TextInput;
