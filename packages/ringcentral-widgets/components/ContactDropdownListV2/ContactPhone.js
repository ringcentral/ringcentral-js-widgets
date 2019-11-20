import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import phoneTypeNames from '../../lib/phoneTypeNames';

export default function ContactPhone({
  formatContactPhone,
  phoneNumber,
  phoneType,
  phoneTypeRenderer,
  splitter,
  enableTitle,
}) {
  const phoneTypeName = phoneTypeRenderer
    ? phoneTypeRenderer(phoneType)
    : phoneTypeNames.getString(phoneType);
  const title = enableTitle
    ? `${formatContactPhone(phoneNumber)} ${splitter} ${phoneTypeName}`
    : undefined;
  return (
    <div className={styles.phoneNumberSection} title={title}>
      <span>{formatContactPhone(phoneNumber)}</span>
      <span className={styles.spliter}>{splitter}</span>
      <span className={styles.label}>{phoneTypeName}</span>
    </div>
  );
}

ContactPhone.propTypes = {
  formatContactPhone: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  phoneType: PropTypes.string.isRequired,
  phoneTypeRenderer: PropTypes.func,
  splitter: PropTypes.string.isRequired,
  enableTitle: PropTypes.bool,
};

ContactPhone.defaultProps = {
  phoneTypeRenderer: undefined,
  enableTitle: undefined,
};
