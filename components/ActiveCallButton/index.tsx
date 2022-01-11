import React from 'react';

import classnames from 'classnames';

import CircleButton from '../CircleButton';
import styles from './styles.scss';

type ActiveCallButtonProps = {
  className?: string;
  buttonClassName?: string;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
  active?: boolean;
  title: string;
  icon?: (...args: any[]) => any;
  showBorder?: boolean;
  width?: string;
  height?: string;
  x?: number;
  y?: number;
  iconWidth?: number;
  iconHeight?: number;
  iconX?: number;
  iconY?: number;
  showRipple?: boolean;
  dataSign?: string;
};
const ActiveCallButton: React.SFC<ActiveCallButtonProps> = (props) => {
  const className = classnames(styles.btnSvg, props.className);
  const buttonClassName = classnames(
    styles.button,
    props.buttonClassName,
    props.active ? styles.buttonActive : null,
    props.disabled ? styles.buttonDisabled : null,
  );
  const text =
    props.title &&
    props.title.split('\n').map((line, index) => (
      <tspan
        dy={index ? '1.1em' : 0}
        x="250"
        key={line}
        data-sign={line.replace(' ', '_')}
      >
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
        showRipple={props.showRipple}
        dataSign={props.dataSign}
      />
      <text className={styles.buttonTitle} x="250" y="500" textAnchor="middle">
        {text}
      </text>
    </svg>
  );
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
  showRipple: false,
};
export default ActiveCallButton;
