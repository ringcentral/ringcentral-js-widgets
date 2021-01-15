import { RcButton, RcCircularProgress, RcIcon } from '@ringcentral/juno';
import CheckSvg from '@ringcentral/juno/icon/Check';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getButtonStatus } from './getButtonStatus';
import i18n from './i18n';
import styles from './styles.scss';

export default function SaveLogButton({
  onSaveCallLog,
  currentLocale,
  currentLog,
  loading,
  isWide,
}) {
  const { buttonDisabled, buttonContent } = getButtonStatus(
    currentLog.currentLogCall,
  );

  const getContent = (buttonContent) => (
    <span>
      {buttonContent === 'saved' && (
        <RcIcon color={['primary', 'main']} symbol={CheckSvg} size="small" />
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
      disabled={buttonDisabled || loading}
      data-sign="saveCall"
      data-state={buttonContent}
      onClick={() => onSaveCallLog(currentLog.call)}
    >
      {content}
    </RcButton>
  );
}

SaveLogButton.propTypes = {
  currentLog: PropTypes.object,
  currentLocale: PropTypes.string,
  onSaveCallLog: PropTypes.func,
  loading: PropTypes.bool,
  isWide: PropTypes.bool,
};

SaveLogButton.defaultProps = {
  currentLog: null,
  currentLocale: null,
  onSaveCallLog() {},
  loading: false,
  isWide: true,
};
