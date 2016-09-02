import React from 'react';
import classNames from 'classnames';

import Icon from '../../shared/Icon';
import prefix from '../../../utils/style';

const { icon, footer, footerButton } =
  prefix(['icon', 'footer', 'footerButton'], 'CallFooter');

const CallFooter = (props) => (
  <div className={footer}>
    <button className={footerButton} onClick={props.onLeftClick}>
      <Icon id={props.leftIcon} />
    </button>
    <button className={footerButton} onClick={props.onRightClick}>
      <Icon id={props.rightIcon} />
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
