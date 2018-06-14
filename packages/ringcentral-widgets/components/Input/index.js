import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const noop = () => {};

/**
 * A wrapped input component to make async input updating possible
 * by using Self-Controlled Component pattern.
 */
export default class Input extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    inputRef: PropTypes.func,
  }

  static defaultProps = {
    value: undefined,
    onChange: undefined,
    onBlur: undefined,
    onFocus: undefined,
    inputRef: undefined,
  }

  static getDerivedStateFromProps(props, state) {
    // When input is focused, do not receive value from outside
    if (state.focused) return state;
    return {
      ...state,
      value: props.value || '',
    };
  }

  // eslint-disable-next-line
  state = { value: null, focused: false };

  _onFocus = (...args) => {
    const { onFocus } = this.props;
    this.setState({
      // eslint-disable-next-line
      focused: true
    });
    if (onFocus) onFocus(...args);
  }

  _onBlur = (...args) => {
    const { onBlur } = this.props;
    this.setState({
      // eslint-disable-next-line
      focused: false
    });
    if (onBlur) onBlur(...args);
  }

  _onChange = (evt) => {
    const { onChange } = this.props;
    this.setState({
      value: evt.currentTarget.value
    });
    if (onChange) onChange(evt);
  }

  render() {
    const props = R.omit(
      ['inputRef', 'value', 'onFocus', 'onBlur', 'onChange'],
      this.props
    );
    const ref = props.inputRef || noop;
    return (
      <input
        {...props}
        ref={ref}
        value={this.state.value}
        onFocus={this._onFocusss}
        onBlur={this._onBlur}
        onChange={this._onChange}
      />
    );
  }
}
