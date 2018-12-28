import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style/index.scss';

import Icon from '../Icon';
import Ripple from './Ripple';

import {
  BUTTON_TYPE,
  BUTTON_ICON,
  BUTTON_SHAPE,
  BUTTON_COLOR,
} from './enum';

const IconMap = {
  // [BUTTON_ICON.download]: // <Icon type='download'></Icon>,
  // [BUTTON_ICON.plus]: // Icon.Plus,
  // [BUTTON_ICON.checked]: // Icon.Checked
};

export default function Button({
  loading,
  shape,
  type,
  color,
  icon,
  className,
  disabled,
  onClick,
  children,
  tooltip,
  prefixCls,
}) {
  const shapStyleMap = {
    [BUTTON_SHAPE.circle]: styles.circle,
    [BUTTON_SHAPE.round]: styles.round,
    [BUTTON_SHAPE.rectangle]: styles.rectangle,
  };
  const typeStyleMap = {
    [BUTTON_TYPE.primary]: styles[`${prefixCls}-primary`],
    [BUTTON_TYPE.outline]: styles[`${prefixCls}-outline`],
  };
  const colorStyleMap = {
    [BUTTON_COLOR.warning]: styles[`${prefixCls}-warning`],
    [BUTTON_COLOR.danger]: styles[`${prefixCls}-danger`],
  };

  const classNames = classnames(
    styles[prefixCls],
    className,
    shapStyleMap[shape],
    typeStyleMap[type],
    colorStyleMap[color],
    disabled && 'disabled'
  );
  return (
    <button
      className={classNames}
      onClick={disabled ? null : onClick}
      title={tooltip}>
      {children}
    </button>
  );
}
Button.propTypes = {
  loading: PropTypes.bool,
  // ['oval', 'circle' ]
  shape: PropTypes.string,
  // ['primary', 'outline', 'default']
  type: PropTypes.string,
  // ['warning', 'danger']
  color: PropTypes.string,
  // ['download', 'plus', 'checked']
  icon: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  prefixCls: PropTypes.string,
  // iconProps
  // size
};

Button.defaultProps = {
  loading: false,
  shape: 'default',
  type: 'default',
  icon: '',
  className: undefined,
  tooltip: '',
  disabled: false,
  onClick: undefined,
  children: undefined,
  prefixCls: 'rc-btn'
  // iconProps: {}
  // size: ''
};

Button.Ripple = Ripple;
