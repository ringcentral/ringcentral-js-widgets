import { RcButton, RcCircularProgress, RcIcon } from '@ringcentral/juno';
import { Check } from '@ringcentral/juno/icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getButtonStatus } from './getButtonStatus';
import i18n from './i18n';
import styles from './styles.scss';

const SaveLogButton = ({
  onSaveCallLog,
  currentLocale,
  currentLog,
  loading,
  isWide,
  disabled,
}) => {
  const { buttonDisabled, buttonContent } = getButtonStatus(
    currentLog.currentLogCall,
  );

  const getContent = (buttonContent) => (
    <span>
      {buttonContent === 'saved' && (
        <RcIcon color="interactive.f01" symbol={Check} size="small" />
      )}
      {buttonContent === 'saving' && <RcCircularProgress size={20} />}
      {buttonContent === 'save' && i18n.getString('save', currentLocale)}
    </span>
  );

  const content = getContent(buttonContent);

  return (
    <RcButton
      className={classnames(styles.button, !isWide && styles.classic)}
      variant="text"
      size="medium"
      disabled={buttonDisabled || loading || disabled}
      data-sign="saveCall"
      data-state={buttonContent}
      onClick={() => onSaveCallLog(currentLog.call)}
    >
      {content}
    </RcButton>
  );
};

SaveLogButton.propTypes = {
  currentLog: PropTypes.object,
  currentLocale: PropTypes.string,
  onSaveCallLog: PropTypes.func,
  loading: PropTypes.bool,
  isWide: PropTypes.bool,
  disabled: PropTypes.bool,
};

SaveLogButton.defaultProps = {
  currentLog: null,
  currentLocale: null,
  onSaveCallLog() {},
  loading: false,
  isWide: true,
  disabled: false,
};

export default SaveLogButton;
