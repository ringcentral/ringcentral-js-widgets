import clsx from 'clsx';
import React, { Component } from 'react';

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
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      await handleCopy(copiedText);
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      handleSuccess();
    } catch (e) {
      if (typeof handleFailure === 'function') {
        handleFailure();
      }
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      currentLocale,
      buttonClassName,
      disabled,
      buttonText,
      button: CustomButton,
    } = this.props;
    return CustomButton ? (
      // @ts-expect-error TS(2604): JSX element type 'CustomButton' does not have any ... Remove this comment to see the full error message
      <CustomButton {...this.props} executeCopy={() => this.executeCopy()} />
    ) : (
      <Button
        disabled={disabled}
        dataSign="copyToClipboard"
        className={clsx(styles.primaryButton, buttonClassName)}
        onClick={() => this.executeCopy()}
      >
        {buttonText || i18n.getString('copyToClipboard', currentLocale)}
      </Button>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
