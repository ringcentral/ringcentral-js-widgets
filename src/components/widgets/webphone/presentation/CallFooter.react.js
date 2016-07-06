import React from 'react';
import classNames from 'classnames';

import styles from '../index.css';
import iconsStyles from '../../../../styles/icon.css';

const CallFooter = (props) => (
  <div className={styles.footer}>
    <button className={styles.footerButton} onClick={props.onLeftClick}>
      <span
        className={
          classNames(
            iconsStyles[props.leftIcon],
            iconsStyles.icon,
            styles.icon
          )}
      ></span>
    </button>
    <button className={styles.footerButton} onClick={props.onRightClick}>
      <span
        className={
          classNames(
            iconsStyles[props.rightIcon],
            iconsStyles.icon,
            styles.icon
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

export default CallFooter;
