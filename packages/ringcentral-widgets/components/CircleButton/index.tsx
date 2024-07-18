import clsx from 'clsx';
import React, { forwardRef } from 'react';

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
const CircleButton: React.FC<CircleButtonProps> = ({
  showBorder = true,
  disabled = false,
  width = '100%',
  height = '100%',
  x = 0,
  y = 0,
  iconWidth = 200,
  iconHeight = 200,
  title,
  iconX = 150,
  iconY = 150,
  showRipple = false,
  icon: iconProp,
  onClick: onClickProp,
  iconClassName,
  dataSign,
  className,
}) => {
  let icon;
  if (iconProp) {
    const Icon = iconProp;
    icon = (
      <Icon
        className={clsx(styles.icon, iconClassName)}
        width={iconWidth}
        height={iconHeight}
        x={iconX}
        y={iconY}
      />
    );
  }
  const circleClass = clsx(styles.circle, !showBorder && styles.noBorder);
  const onClick = disabled ? null : onClickProp;

  return (
    <svg
      data-sign={dataSign}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles.btnSvg, className)}
      viewBox="0 0 500 500"
      aria-disabled={disabled}
      onClick={(e) => {
        if (
          // Add NODE_ENV as a workaround for integration test env when triggering its events by data-sign
          process.env.NODE_ENV === 'test' ||
          (e.target && (e.target as HTMLElement).tagName !== 'svg')
        ) {
          onClick?.(e);
        }
      }}
      width={width}
      height={height}
      x={x}
      y={y}
      // TODO: add title to svg for we can check with title
      // @ts-ignore
      title={title}
    >
      {title ? <title>{title}</title> : null}
      <g className={styles.btnSvgGroup}>
        <circle className={circleClass} cx="250" cy="250" r="245" />
        {icon}
        {showRipple ? (
          <circle className={styles.ripple} cx="250" cy="250" r="245" />
        ) : null}
      </g>
    </svg>
  );
};

export default CircleButton;

// TODO: that component for wrap CircleButton error write way for not support title
export const CircleButtonWithTitle = forwardRef<
  HTMLSpanElement,
  CircleButtonProps
>(({ title, ...rest }, ref) => {
  return (
    <span title={title} ref={ref}>
      <CircleButton title={title} {...rest} />
    </span>
  );
});
