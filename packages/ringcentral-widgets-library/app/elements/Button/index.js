import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style/index.scss';

import Icon from '../Icon';

import {
  BUTTON_SHAP,
  BUTTON_TYPE,
  BUTTON_ICON
} from './enum';

const shapStyleMap = {
  [BUTTON_SHAP.circle]: styles.circle,
  [BUTTON_SHAP.round]: styles.round,
  [BUTTON_SHAP.rectangle]: styles.rectangle,
};

const IconMap = {
  // [BUTTON_ICON.download]: // <Icon type='download'></Icon>,
  // [BUTTON_ICON.plus]: // Icon.Plus,
  // [BUTTON_ICON.checked]: // Icon.Checked
};

export default function Button({
  loading,
  shape,
  type,
  icon,
  className,
  disabled,
  onClick,
  children,
  tooltip,
  prefixCls,
}) {
  const typeStyleMap = {
    [BUTTON_TYPE.primary]: styles[`${prefixCls}-primary`],
    [BUTTON_TYPE.warning]: styles[`${prefixCls}-warning`],
    [BUTTON_TYPE.outline]: styles[`${prefixCls}-outline`],
    [BUTTON_TYPE.danger]: styles[`${prefixCls}-danger`],
  };
  const classNames = classnames(
    styles[prefixCls],
    className,
    shapStyleMap[shape],
    typeStyleMap[type],
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
  // ['primary', 'warning', 'outline', 'danger', 'default']
  type: PropTypes.string,
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
