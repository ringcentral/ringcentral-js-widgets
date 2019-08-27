import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ThemeConsumer } from '../commons/themeContext';
import styles from './styles.scss';

function Title(props) {
  const {
    label, subLabel, theme, className
  } = props;

  const titleCls = classnames(styles.title, {
    [styles.isOld]: theme.isOldUI,
  }, className);

  return (
    <div className={titleCls}>
      {label}
      {subLabel && <span className={styles.subLabel}>&nbsp;{subLabel}</span>}
    </div>
  );
}

Title.propTypes = {
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Title.defaultProps = {
  subLabel: null,
  className: '',
};

export default ThemeConsumer(Title);
