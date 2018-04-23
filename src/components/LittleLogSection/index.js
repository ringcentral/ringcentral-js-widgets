import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import LogBasicInfo from '../LogBasicInfo';
import styles from './styles.scss';
import i18n from './i18n';

export default function LittleLogSection(
  {
    formatPhone,
    currentLog,
    currentLocale,
    isExpand,
    call,
    onStay,
    onDiscard,
    onSave,
    onExpand,
  }
) {
  return (
    <div className={styles.container}>
      <LogBasicInfo
        currentLog={currentLog}
        currentLocale={currentLocale}
        formatPhone={formatPhone}
      />
      <Button
        disabled={isExpand}
        className={styles.expandButton}
        onClick={() => onExpand(call)}>
        {i18n.getString('log', currentLocale)}
      </Button>
      {
        isExpand ? (
          <div className={styles.confirmationContainer}>
            <div className={styles.confirmationInfo}>
              {i18n.getString('confirmationInfo', currentLocale)}
            </div>
            <div className={styles.confirmationButtons}>
              <Button
                className={styles.saveButton}
                onClick={() => onSave(call)}>
                {i18n.getString('save', currentLocale)}
              </Button>
              <Button
                className={styles.discardButton}
                onClick={() => onDiscard(call)}>
                {i18n.getString('discard', currentLocale)}
              </Button>
              <Button
                className={styles.stayButton}
                onClick={() => onStay(call)}>
                {i18n.getString('stay', currentLocale)}
              </Button>
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

LittleLogSection.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  currentLog: PropTypes.object,
  formatPhone: PropTypes.func,
  isExpand: PropTypes.bool,
  call: PropTypes.object,
  onStay: PropTypes.func,
  onDiscard: PropTypes.func,
  onSave: PropTypes.func,
  onExpand: PropTypes.func,
};

LittleLogSection.defaultProps = {
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  call: {},
  onStay: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined,
};
