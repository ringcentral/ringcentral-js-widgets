import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import LogBasicInfo from '../LogBasicInfo';
import styles from './styles.scss';
import i18n from './i18n';

export default function LogNotification(
  {
    formatPhone,
    currentLog,
    currentLocale,
    isExpand,
    onStay,
    onDiscard,
    onSave,
    onExpand,
  }
) {
  return (
    <div className={styles.container}>
      <div className={styles.basicInfo}>
        <LogBasicInfo
          currentLog={currentLog}
          currentLocale={currentLocale}
          formatPhone={formatPhone}
        />
        <Button
          disabled={isExpand}
          className={classnames(styles.expandButton, isExpand && styles.expandDisableButton)}
          onClick={() => onExpand()}>
          {i18n.getString('log', currentLocale)}
        </Button>
      </div>
      {
        isExpand ? (
          <div className={styles.confirmationContainer}>
            <div className={styles.confirmationInfo}>
              {i18n.getString('confirmationInfo', currentLocale)}
            </div>
            <div className={styles.confirmationButtons}>
              {
                onSave ? (
                  <Button
                    className={classnames(styles.saveButton, styles.selected)}
                    onClick={() => onSave()}>
                    {i18n.getString('save', currentLocale)}
                  </Button>
                ) : null
              }
              {
                onDiscard ? (
                  <Button
                    className={styles.discardButton}
                    onClick={() => onDiscard()}>
                    {i18n.getString('discard', currentLocale)}
                  </Button>
                ) : null
              }
              {
                onStay ? (
                  <Button
                    className={styles.stayButton}
                    onClick={() => onStay()}>
                    {i18n.getString('stay', currentLocale)}
                  </Button>
                ) : null
              }
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

LogNotification.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  currentLog: PropTypes.object,
  formatPhone: PropTypes.func,
  isExpand: PropTypes.bool,
  onStay: PropTypes.func,
  onDiscard: PropTypes.func,
  onSave: PropTypes.func,
  onExpand: PropTypes.func,
};

LogNotification.defaultProps = {
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  onStay: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined,
};
