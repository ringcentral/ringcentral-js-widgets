import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type CircleButtonProps = {
  icon?: (...args: any[]) => any;
  className?: string;
  dataSign?: string;
  showBorder?: boolean;
  iconClassName?: string;
  onClick?: (...args: any[]) => any;
  width?: string;
  height?: string;
  x?: number;
  y?: number;
  disabled?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  iconX?: number;
  iconY?: number;
  title?: string;
  showRipple?: boolean;
};
const CircleButton: React.SFC<CircleButtonProps> = (props) => {
  let icon;
  if (props.icon) {
    const Icon = props.icon;
    icon = (
      <Icon
        className={classnames(styles.icon, props.iconClassName)}
        width={props.iconWidth}
        height={props.iconHeight}
        x={props.iconX}
        y={props.iconY}
      />
    );
  }
  const circleClass = classnames(
    styles.circle,
    !props.showBorder && styles.noBorder,
  );
  const onClick = props.disabled ? null : props.onClick;
  return (
    <svg
      data-sign={props.dataSign}
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(styles.btnSvg, props.className)}
      viewBox="0 0 500 500"
      aria-disabled={props.disabled}
      onClick={(e) => {
        // @ts-expect-error TS(2339): Property 'tagName' does not exist on type 'EventTa... Remove this comment to see the full error message
        if (e.target && e.target.tagName !== 'svg' && onClick) {
          onClick(e);
        }
      }}
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    >
      {props.title ? <title>{props.title}</title> : null}
      <g className={styles.btnSvgGroup}>
        <circle className={circleClass} cx="250" cy="250" r="245" />
        {icon}
        {props.showRipple ? (
          <circle className={styles.ripple} cx="250" cy="250" r="245" />
        ) : null}
      </g>
    </svg>
  );
};
CircleButton.defaultProps = {
  icon: undefined,
  className: undefined,
  dataSign: undefined,
  showBorder: true,
  iconClassName: undefined,
  disabled: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '((...args: ... Remove this comment to see the full error message
  onClick: null,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: 200,
  iconHeight: 200,
  iconX: 150,
  iconY: 150,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  title: null,
  showRipple: false,
};
export default CircleButton;
