import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import i18n from './i18n';

const UIHeightOffset = 23;
// the extra height of the entire field with paddings and borders

export default class MessageInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    currentLocale: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    maxLength: PropTypes.number,
    onSend: PropTypes.func,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
  }
  static defaultProps = {
    disabled: false,
    onSend: undefined,
    onChange: undefined,
    onHeightChange: undefined,
    minHeight: 63,
    maxHeight: 300,
    maxLength: 5000,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value,
      height: props.minHeight,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  onChange = (e) => {
    // set textarea height = 0 to get accurate scrollHeight
    e.currentTarget.style.height = 0;
    const {
      currentTarget: {
        value,
        scrollHeight,
      }
    } = e;
    // set textarea height back to original value to avoid messing with react
    e.currentTarget.style.height = `${this.state.height - UIHeightOffset}px`;

    let newHeight = scrollHeight + 10 + UIHeightOffset;
    const {
      minHeight,
      maxHeight,
    } = this.props;
    if (newHeight < minHeight) {
      newHeight = minHeight;
    } else if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    if (newHeight !== this.state.height && typeof this.props.onHeightChange === 'function') {
      this.props.onHeightChange(newHeight);
    }
    this.setState({
      value,
      height: newHeight,
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        /* ignore */
      } else {
        e.preventDefault();
        if (typeof this.props.onSend === 'function') {
          this.props.onSend();
        }
      }
    }
  }
  render() {
    const {
      currentLocale,
      disabled,
      onSend,
      maxLength,
    } = this.props;
    const {
      value,
      height,
    } = this.state;
    const inputHeight = height - UIHeightOffset;
    return (
      <div className={styles.root}>
        <div className={styles.textField}>
          <textarea
            placeholder={i18n.getString('typeMessage', currentLocale)}
            value={value}
            maxLength={maxLength}
            onChange={this.onChange}
            onKeyPressCapture={this.onKeyDown}
            style={{
              height: inputHeight,
            }}
          />
        </div>
        <div className={styles.submitField}>
          <input
            type="button"
            value={i18n.getString('send', currentLocale)}
            onClick={onSend}
            className={styles.sendButton}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}
