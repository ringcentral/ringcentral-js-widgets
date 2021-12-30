import React, { Component } from 'react';

import classnames from 'classnames';

import isBlank from '@ringcentral-integration/commons/lib/isBlank';
import { RcMenuItem, RcMenuList, styled } from '@ringcentral/juno';

import { Button } from '../Button';
import i18n from './i18n';
import styles from './styles.scss';
import { MINS, TimeInput } from './TimeInput';

const CALL_YOU = 0;
const CALL_ME = 1;
const ON_MY_WAY = 2;
const CUSTOM_MESSAGE = 3;
const cleanRegex = /[^\d]/g;

const StyledMenuItem = styled(RcMenuItem)`
  flex-wrap: wrap;
`;

StyledMenuItem.defaultProps = {
  disableRipple: true,
};

type ReplyWithMessageProps = {
  className?: string;
  onCancel: (...args: any[]) => any;
  onReply: (...args: any[]) => any;
  currentLocale: string;
  onChange?: (...args: any[]) => any;
  disabled: boolean;
};

type ReplyWithMessageState = {
  type: number;
  customValue: string;
  callYouTimeValue: string;
  callYouTimeUnit: any;
  callMeTimeValue: string;
  callMeTimeUnit: number;
};

class ReplyWithMessage extends Component<
  ReplyWithMessageProps,
  ReplyWithMessageState
> {
  callYouInputRef: any;
  callMeInputRef: any;
  customValueInput: any;

  static defaultProps: Partial<ReplyWithMessageProps> = {
    className: null,
    onChange: undefined,
  };

  constructor(props: ReplyWithMessageProps) {
    super(props);
    this.state = {
      type: ON_MY_WAY,
      customValue: '',
      callYouTimeValue: '',
      callYouTimeUnit: MINS,
      callMeTimeValue: '',
      callMeTimeUnit: MINS,
    };
  }

  onSelectType = (index: number) => {
    this.setState({
      type: index,
    });
    this.props.onChange(this._getValue());
  };

  onCustomValueChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    this.setState({
      customValue: value,
    });
    this.props.onChange(this._getValue());
  };

  onCallYouTimeValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const value = e.target.value;
    this.setState({
      callYouTimeValue: value.replace(cleanRegex, ''),
    });
  };

  onCallYouTimeUnitChange = (unit: number) => {
    this.setState({
      callYouTimeUnit: unit,
    });
  };

  onCallMeTimeValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    this.setState({
      callMeTimeValue: value.replace(cleanRegex, ''),
    });
  };

  onCallMeTimeUnitChange = (unit: number) => {
    this.setState({
      callMeTimeUnit: unit,
    });
  };

  onReply = () => {
    this.props.onReply(this._getValue());
  };

  onCallYouInputRef = (input: HTMLInputElement) => {
    this.callYouInputRef = input;
  };

  onCallMeInputRef = (input: HTMLInputElement) => {
    this.callMeInputRef = input;
  };

  _getValue() {
    const value: {
      replyType: number;
      callbackDirection?: number;
      replyText?: string;
      timeValue?: string;
      timeUnits?: number;
    } = { replyType: 0 };
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
    const { className, onCancel, currentLocale, disabled } = this.props;
    const disableButton = isBlank(this._getValue().replyText) || disabled;
    return (
      <div className={classnames(styles.root, className)}>
        <RcMenuList className={styles.messages}>
          <StyledMenuItem
            onClick={() => {
              this.onSelectType(CALL_YOU);
              setTimeout(() => {
                this.callYouInputRef.focus();
              }, 100);
            }}
            className={classnames(
              styles.messageItem,
              this.state.type === CALL_YOU ? styles.active : null,
            )}
            data-sign="willCallYouBackIn"
          >
            <div className={styles.label}>
              {i18n.getString('willCallYouBackIn', currentLocale)}...
            </div>
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
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              this.onSelectType(CALL_ME);
              setTimeout(() => {
                this.callMeInputRef.focus();
              }, 100);
            }}
            className={classnames(
              styles.messageItem,
              this.state.type === CALL_ME ? styles.active : null,
            )}
            data-sign="callMeBackIn"
          >
            <div className={styles.label}>
              {i18n.getString('callMeBackIn', currentLocale)}...
            </div>
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
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => this.onSelectType(ON_MY_WAY)}
            className={classnames(
              styles.messageItem,
              this.state.type === ON_MY_WAY ? styles.active : null,
            )}
            data-sign="onMyWay"
          >
            <div className={styles.label}>
              {i18n.getString('onMyWay', currentLocale)}
            </div>
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              this.onSelectType(CUSTOM_MESSAGE);
              setTimeout(() => {
                this.customValueInput.focus();
              }, 100);
            }}
            className={classnames(
              styles.messageItem,
              this.state.type === CUSTOM_MESSAGE ? styles.active : null,
            )}
            data-sign="customMessage"
          >
            <div className={styles.label}>
              {i18n.getString('customMessage', currentLocale)}
            </div>
            <div className={styles.inputField}>
              <textarea
                value={this.state.customValue}
                maxLength={50}
                onChange={this.onCustomValueChange}
                ref={(input) => {
                  this.customValueInput = input;
                }}
              />
            </div>
          </StyledMenuItem>
        </RcMenuList>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.cancelButton}
            onClick={onCancel}
            dataSign="cancelReplyButton"
          >
            {i18n.getString('cancel', currentLocale)}
          </Button>
          <Button
            className={classnames(
              styles.replyButton,
              disableButton ? styles.disabled : null,
            )}
            onClick={this.props.disabled ? () => {} : this.onReply}
            disabled={disableButton}
            dataSign="doReplyButton"
          >
            <span className={styles.buttonText}>
              {i18n.getString('reply', currentLocale)}
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

export default ReplyWithMessage;
