import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Icon from '../../../../elements/Icon';

export default function Header() {
  return (
    <div className={styles.header}>
      <Icon type="Dialpad" className={styles.icon} iconWidth="26" iconHeight="26" />
      <Icon type="Time" className={styles.icon} iconWidth="26" iconHeight="26" />
      <Icon type="Message" className={styles.icon} iconWidth="26" iconHeight="26" />
      <Icon type="SettingNav" className={styles.icon} iconWidth="26" iconHeight="26" />
    </div>
  );
}

Header.propTypes = {};
