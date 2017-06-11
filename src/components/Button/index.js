import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

export default function Button({
  className,
  disabled,
  onClick,
  children,
}) {
  return (
    <div
      className={classnames(
        className,
        styles.root,
        disabled && styles.disabled,
      )}
      onClick={!disabled && onClick} >
      {children}
    </div>
  );
}
Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined,
};
