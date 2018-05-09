import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import styles from './styles.scss';
import i18n from './i18n';


class CopyToClipboard extends Component {
  render() {
    const {
      handleSuccess,
      handleFailure,
      currentLocale,
      buttonClassName,
      disabled,
      copiedText,
      buttonText,
      button: CustomButton,
    } = this.props;
    const executeCopy = () => {
      this.copyTextArea.focus();
      this.copyTextArea.select();
      try {
        const result = document.execCommand('copy');
        if (result) {
          this.copyTextArea.blur();
          if (typeof handleSuccess === 'function') handleSuccess();
        } else if (typeof handleFailure === 'function') {
          handleFailure();
        }
      } catch (e) {
        console.error(e);
        if (typeof handleFailure === 'function') {
          handleFailure();
        }
      }
    };
    return (
      <div className={styles.container}>
        <textarea
          className={styles.copyTextArea}
          ref={(ref) => { this.copyTextArea = ref; }}
          defaultValue={copiedText} />
        {
          CustomButton ? (
            <CustomButton {...this.props} />
          ) : (
            <Button
              disabled={disabled}
              className={classnames(styles.primaryButton, buttonClassName)}
              onClick={() => executeCopy()}>
              { buttonText || i18n.getString('copyToClipboard', currentLocale)}
            </Button>
          )
        }
      </div>
    );
  }
}


CopyToClipboard.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  handleSuccess: PropTypes.func,
  handleFailure: PropTypes.func,
  buttonClassName: PropTypes.string,
  disabled: PropTypes.bool,
  copiedText: PropTypes.string,
  buttonText: PropTypes.string,
  button: PropTypes.node,
};

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
