/**
 * Checkbox whose style is according to Outlook Online Page
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';
import { ThemeConsumer } from '../commons/themeContext';
import iconStyles from '../commons/icons.scss';

function Checkbox({
  checked, onChange, label, className, size, theme
}) {
  return (
    <span
      className={classNames(styles.checkbox, className, {
        [styles.default]: size === 'default',
        [styles.small]: size === 'small',
        [styles.xsmall]: size === 'xsmall',
        [styles.checked]: checked,
        [styles[`${theme.key}-is-checked`]]: checked
      })}
      onClick={() => onChange && onChange(!checked)}
    >
      <span className={classNames(styles.checkboxIcon, iconStyles.msIconCheckMark)} />
      <span className={styles.checkboxText}>{label}</span>
    </span>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: null,
  size: 'default',
  className: '',
  label: '',
};

export default ThemeConsumer(Checkbox);
