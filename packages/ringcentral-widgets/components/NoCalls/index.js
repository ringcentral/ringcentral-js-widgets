import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import i18n from './i18n';

export default function NoCalls({ currentLocale, active }) {
  return (
    <p className={styles.noCalls}>
      {i18n.getString(active ? 'noActiveCalls' : 'noRecords', currentLocale)}
    </p>
  );
}
NoCalls.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
