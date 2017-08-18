import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isBlank from 'ringcentral-integration/lib/isBlank';

import Button from '../Button';

import styles from './styles.scss';
import i18n from './i18n';

const CALL_YOU = 0;
const CALL_ME = 1;
const ON_MY_WAY = 2;
const CUSTOM_MESSAGE = 3;

const MINS = 0;
const HOURS = 1;
const DAYS = 2;

const cleanRegex = /[^\d]/g;

function TimeInput(props) {
  return (
    <div className={styles.timeInput}>
      <span className={styles.timeValue}>
        <input
          maxLength={2}
          value={props.timeValue}
          onChange={props.onTimeValueChange}
          ref={props.inputRef}
        />
      </span>
      <span
        onClick={() => props.onSelectTimeUnit(MINS)}
        className={props.timeUnit === MINS ? styles.timeUnitSelected : null}>
        {i18n.getString('min', props.currentLocale)}
      </span>
      <span
        className={props.timeUnit === HOURS ? styles.timeUnitSelected : null}
        onClick={() => props.onSelectTimeUnit(HOURS)}>
        {i18n.getString('hours', props.currentLocale)}
      </span>
      <span
        className={props.timeUnit === DAYS ? styles.timeUnitSelected : null}
        onClick={() => props.onSelectTimeUnit(DAYS)}>
        {i18n.getString('days', props.currentLocale)}
      </span>
    </div>
  );
}

TimeInput.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  timeValue: PropTypes.string,
  timeUnit: PropTypes.number,
  inputRef: PropTypes.func.isRequired,
  onTimeValueChange: PropTypes.func.isRequired,
  onSelectTimeUnit: PropTypes.func.isRequired,
};

TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS,
};

export default class ReplyWithMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ON_MY_WAY,
      customValue: '',
      callYouTimeValue: '',
      callYouTimeUnit: MINS,
      callMeTimeValue: '',
      callMeTimeUnit: MINS,
    };

    this.onSelectType = (index) => {
      this.setState({
        type: index,
      });
      this.props.onChange(this._getValue());
    };

    this.onCustomValueChange = (e) => {
      const value = e.target.value;
      this.setState({
        customValue: value,
      });
      this.props.onChange(this._getValue());
    };

    this.onCallYouTimeValueChange = (e) => {
      const value = e.target.value;
      this.setState({
        callYouTimeValue: value.replace(cleanRegex, ''),
      });
    };

    this.onCallYouTimeUnitChange = (unit) => {
      this.setState({
        callYouTimeUnit: unit,
      });
    };

    this.onCallMeTimeValueChange = (e) => {
      const value = e.target.value;
      this.setState({
        callMeTimeValue: value.replace(cleanRegex, ''),
      });
    };

    this.onCallMeTimeUnitChange = (unit) => {
      this.setState({
        callMeTimeUnit: unit,
      });
    };

    this.onReply = () => {
      this.props.onReply(this._getValue());
    };
    this.onCallYouInputRef = (input) => {
      this.callYouInputRef = input;
    };
    this.onCallMeInputRef = (input) => {
      this.callMeInputRef = input;
    };
  }

  _getValue() {
    const value = { replyType: 0 };
    if (this.state.type === CUSTOM_MESSAGE) {
      value.replyText = this.state.customValue;
    }
    if (this.state.type === ON_MY_WAY) {
      value.replyText = 'On my way';
    }
    if (this.state.type < 2) {
      value.replyType = 1;
      value.callbackDirection = this.state.type;
      if (this.state.type === 0) {
        value.timeValue = this.state.callYouTimeValue;
        value.timeUnits = this.state.callYouTimeUnit;
        value.replyText = this.state.callYouTimeValue;
      } else {
        value.timeValue = this.state.callMeTimeValue;
        value.timeUnits = this.state.callMeTimeUnit;
        value.replyText = this.state.callMeTimeValue;
      }
    }
    return value;
  }

  render() {
    const {
      className,
      onCancel,
      currentLocale,
      disabled
    } = this.props;
    const disableButton = isBlank(this._getValue().replyText) || disabled;
    return (
      <div className={classnames(styles.root, className)}>
        <div className={styles.messages}>
          <div
            onClick={() => {
              this.onSelectType(CALL_YOU);
              setTimeout(() => {
                this.callYouInputRef.focus();
              }, 100);
            }}
            className={classnames(
              styles.messageItem, this.state.type === CALL_YOU ? styles.active : null
            )}
          >
            <div className={styles.label}>{i18n.getString('willCallYouBackIn', currentLocale)}...</div>
            <div className={styles.inputField}>
              <TimeInput
                currentLocale={currentLocale}
                timeValue={this.state.callYouTimeValue}
                timeUnit={this.state.callYouTimeUnit}
                onTimeValueChange={this.onCallYouTimeValueChange}
                onSelectTimeUnit={this.onCallYouTimeUnitChange}
                inputRef={this.onCallYouInputRef}
              />
            </div>
          </div>
          <div
            onClick={() => {
              this.onSelectType(CALL_ME);
              setTimeout(() => {
                this.callMeInputRef.focus();
              }, 100);
            }}
            className={classnames(
              styles.messageItem, this.state.type === CALL_ME ? styles.active : null
            )}
          >
            <div className={styles.label}>{i18n.getString('callMeBackIn', currentLocale)}...</div>
            <div className={styles.inputField}>
              <TimeInput
                currentLocale={currentLocale}
                timeValue={this.state.callMeTimeValue}
                timeUnit={this.state.callMeTimeUnit}
                onTimeValueChange={this.onCallMeTimeValueChange}
                onSelectTimeUnit={this.onCallMeTimeUnitChange}
                inputRef={this.onCallMeInputRef}
              />
            </div>
          </div>
          <div
            onClick={() => this.onSelectType(ON_MY_WAY)}
            className={classnames(
              styles.messageItem, this.state.type === ON_MY_WAY ? styles.active : null
            )}
          >
            <div className={styles.label}>{i18n.getString('onMyWay', currentLocale)}</div>
          </div>
          <div
            onClick={() => {
              this.onSelectType(CUSTOM_MESSAGE);
              setTimeout(() => {
                this.customValueInput.focus();
              }, 100);
            }}
            className={classnames(
              styles.messageItem, this.state.type === CUSTOM_MESSAGE ? styles.active : null
            )}
          >
            <div className={styles.label}>{i18n.getString('customMessage', currentLocale)}</div>
            <div className={styles.inputField}>
              <textarea
                value={this.state.customValue}
                maxLength={50}
                onChange={this.onCustomValueChange}
                ref={(input) => { this.customValueInput = input; }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {i18n.getString('cancel', currentLocale)}
          </Button>
          <Button
            className={
              classnames(styles.replyButton, disableButton ? styles.disabled : null)
            }
            onClick={this.props.disabled ? () => {} : this.onReply}
            disabled={disableButton}
          >
            <span className={styles.buttonText}>
              {i18n.getString('send', currentLocale)}
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

ReplyWithMessage.propTypes = {
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
};

ReplyWithMessage.defaultProps = {
  className: null,
  onChange: undefined,
};
