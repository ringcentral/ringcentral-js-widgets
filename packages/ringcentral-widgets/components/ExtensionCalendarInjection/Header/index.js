import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { ThemeConsumer } from '../commons/themeContext';
import styles from './styles.scss';

function Header(props) {
  const { theme, onClose, i18n } = props;

  if (theme.isOldUI) {
    return (
      <div className={styles.isOldHeader}>
        <CloseButton className={styles.headerCloseButton} onClick={onClose} />
        <div className={styles.headerTitle}>{i18n.popupTitle}</div>
      </div>
    );
  }
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>{i18n.popupTitle}</div>
      <CloseButton onClick={onClose} />
    </div>
  );
}

Header.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default ThemeConsumer(Header);
