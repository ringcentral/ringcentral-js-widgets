import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Switch from '../../Switch';
import { ThemeConsumer } from '../commons/themeContext';

import styles from './styles.scss';

function ThemeSwitch(props) {
  const { theme, ...rest } = props;
  return (
    <Switch
      className={classnames(styles.switch, theme.isOldUI && styles.isOld, styles[theme.key], theme.UI && styles[theme.UI])}
      {...rest}
    />
  );
}

ThemeSwitch.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default ThemeConsumer(ThemeSwitch);
