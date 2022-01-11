import React, { Component } from 'react';

import classnames from 'classnames';

import { handleCopy } from '../../lib/handleCopy';
import { Button } from '../Button';
import i18n from './i18n';
import styles from './styles.scss';

type CopyToClipboardProps = {
  currentLocale: string;
  handleSuccess?: (...args: any[]) => any;
  handleFailure?: (...args: any[]) => any;
  buttonClassName?: string;
  disabled?: boolean;
  copiedText?: string;
  buttonText?: string;
  button?: React.ReactNode | ((...args: any[]) => any);
};
class CopyToClipboard extends Component<CopyToClipboardProps, {}> {
  async executeCopy() {
    const { copiedText, handleSuccess, handleFailure } = this.props;
    try {
      await handleCopy(copiedText);
      handleSuccess();
    } catch (e) {
      if (typeof handleFailure === 'function') {
        handleFailure();
      }
    }
  }
  render() {
    const {
      currentLocale,
      buttonClassName,
      disabled,
      buttonText,
      button: CustomButton,
    } = this.props;
    return CustomButton ? (
      <CustomButton {...this.props} executeCopy={() => this.executeCopy()} />
    ) : (
      <Button
        disabled={disabled}
        dataSign="copyToClipboard"
        className={classnames(styles.primaryButton, buttonClassName)}
        onClick={() => this.executeCopy()}
      >
        {buttonText || i18n.getString('copyToClipboard', currentLocale)}
      </Button>
    );
  }
}
CopyToClipboard.defaultProps = {
  handleSuccess: undefined,
  handleFailure: undefined,
  buttonClassName: undefined,
  disabled: undefined,
  copiedText: undefined,
  buttonText: undefined,
  button: undefined,
};
export default CopyToClipboard;
