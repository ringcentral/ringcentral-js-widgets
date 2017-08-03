import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircleButton from '../CircleButton';

import styles from './styles.scss';

export default function ActiveCallButton(props) {
  const className = classnames(styles.btnSvg, props.className);
  const buttonClassName = classnames(
    styles.button,
    props.buttonClassName,
    props.active ? styles.buttonActive : null,
    props.disabled ? styles.buttonDisabled : null,
  );
  return (
    <svg className={className} viewBox="0 0 500 500">
      <CircleButton
        width={200}
        height={200}
        x={150}
        y={150}
        className={buttonClassName}
        onClick={props.onClick}
        icon={props.icon}
        disabled={props.disabled}
        showBorder={props.showBorder}
        iconClassName={props.buttonClassName}
      />
      <text
        className={styles.buttonTitle}
        x="0"
        dx="200"
        y="0"
        dy="280"
      >
        {props.title}
      </text>
    </svg>
  );
}

ActiveCallButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  showBorder: PropTypes.bool,
};

ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  disabled: false,
  active: false,
  icon: undefined,
  showBorder: true,
};
