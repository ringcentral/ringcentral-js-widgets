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
  const text = props.title.split('\n').map((line, index) => (
    <tspan dy={index ? '1.1em' : 0} x="250" key={line}>
      {line}
    </tspan>
  ));
  const buttonSize = 383.8;

  return (
    <svg
      className={className}
      viewBox="0 0 500 600"
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    >
      <CircleButton
        width={buttonSize.toString()}
        height={buttonSize.toString()}
        x={500 / 2 - buttonSize / 2}
        y={0}
        className={buttonClassName}
        onClick={props.onClick}
        icon={props.icon}
        disabled={props.disabled}
        showBorder={props.showBorder}
        iconClassName={props.buttonClassName}
        iconWidth={props.iconWidth}
        iconHeight={props.iconHeight}
        iconX={props.iconX}
        iconY={props.iconY}
      />
      <text
        className={styles.buttonTitle}
        x="250"
        y="500"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
}

ActiveCallButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  showBorder: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  iconX: PropTypes.number,
  iconY: PropTypes.number,
};

ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  onClick: undefined,
  disabled: false,
  active: false,
  icon: undefined,
  showBorder: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: undefined,
  iconHeight: undefined,
  iconX: undefined,
  iconY: undefined,
};
