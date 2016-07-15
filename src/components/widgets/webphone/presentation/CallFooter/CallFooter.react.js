import React from 'react';
import classNames from 'classnames';

import webphoneStyles from '../../index.css';
import { footer, footerButton } from './CallFooter.css';
import iconsStyles from '../../../../../styles/icon.css';

const CallFooter = (props) => (
  <div className={footer}>
    <button className={footerButton} onClick={props.onLeftClick}>
      <span
        className={
          classNames(
            iconsStyles[props.leftIcon],
            iconsStyles.icon,
            webphoneStyles.icon
          )}
      ></span>
    </button>
    <button className={footerButton} onClick={props.onRightClick}>
      <span
        className={
          classNames(
            iconsStyles[props.rightIcon],
            iconsStyles.icon,
            webphoneStyles.icon
          )}
      ></span>
    </button>
  </div>
);

CallFooter.propTypes = {
  onLeftClick: React.PropTypes.func,
  onRightClick: React.PropTypes.func,
  leftIcon: React.PropTypes.string,
  rightIcon: React.PropTypes.string,
};

CallFooter.defaultProps = {
  leftIcon: 'icon-uniCE',
  rightIcon: 'icon-uni44',
};

export default CallFooter;
