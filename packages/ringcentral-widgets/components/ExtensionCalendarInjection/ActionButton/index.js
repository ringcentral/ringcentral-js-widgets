import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';
import ActionButton from '../../Button';

export default function Button(props) {
  const {
    disabled = false, checked, iconClassName, text, onClick, ...args
  } = props;

  return (
    <ActionButton
      {...args}
      disabled={disabled}
      checked={checked}
      onClick={onClick}
      className={styles.button}
      >
      {iconClassName ? <i role="presentation" className={classNames([iconClassName, styles.icon])} aria-hidden /> : null}
      {text}
    </ActionButton>
  );
}

export const ButtonPropTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  iconClassName: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.propTypes = ButtonPropTypes;
Button.defaultProps = {
  disabled: false,
  checked: false,
  text: 'test',
  iconClassName: null,
  onClick: i => i,
};
