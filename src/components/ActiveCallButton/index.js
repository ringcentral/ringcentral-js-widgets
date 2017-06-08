import React, { PropTypes } from 'react';
import classnames from 'classnames';
import CircleButton from '../CircleButton';

import styles from './styles.scss';

export default function ActiveCallButton(props) {
  const className = classnames(styles.root, props.className);
  const buttonClassName = classnames(
    styles.button,
    props.buttonClassName,
    props.active ? styles.buttonActive : null
  );
  return (
    <div className={className}>
      <CircleButton
        className={buttonClassName}
        onClick={props.onClick}
        Icon={props.Icon}
        disabled={props.disabled}
        showBorder={props.showBorder}
        iconClassName={props.buttonClassName}
      />
      <div className={styles.buttonTitle}>
        {props.title}
      </div>
    </div>
  );
}

ActiveCallButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func,
  showBorder: PropTypes.bool,
};

ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  disabled: false,
  active: false,
  Icon: undefined,
  showBorder: true,
};
