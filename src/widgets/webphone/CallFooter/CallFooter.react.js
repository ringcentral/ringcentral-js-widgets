import React from 'react';
import classNames from 'classnames';

import iconsStyles from '../../../styles/icon.css';
import prefix from '../../../utils/style';

const { icon, footer, footerButton } =
  prefix(['icon', 'footer', 'footerButton'], 'CallFooter');

const CallFooter = (props) => (
  <div className={footer}>
    <button className={footerButton} onClick={props.onLeftClick}>
      <span
        className={
          classNames(
            iconsStyles[props.leftIcon],
            iconsStyles.icon,
            icon
          )}
      ></span>
    </button>
    <button className={footerButton} onClick={props.onRightClick}>
      <span
        className={
          classNames(
            iconsStyles[props.rightIcon],
            iconsStyles.icon,
            icon
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
