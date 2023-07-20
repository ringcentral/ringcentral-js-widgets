import type { FunctionComponent } from 'react';
import React from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import IconLine from '../IconLine';
import styles from './styles.scss';

type LinkLineProps = {
  className?: string;
  hideUnderline?: boolean;
  hrefClassName?: string;
  iconClassName?: string;
  onClick: (...args: any[]) => any;
  tooltip?: string;
  dataSign?: string;
  pendoSignName?: string;
};

const LinkLine: FunctionComponent<LinkLineProps> = ({
  onClick,
  className,
  children,
  hideUnderline = false,
  hrefClassName,
  iconClassName,
  tooltip,
  dataSign,
  pendoSignName,
  ...rest
}) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={tooltip}
      className={classnames(styles.link, hrefClassName)}
      style={hideUnderline ? { textDecoration: 'none' } : {}}
      data-sign={dataSign || undefined}
      data-pendo={pendoSignName || undefined}
      {...rest}
    >
      <IconLine
        className={className}
        icon={
          <span
            className={classnames(
              dynamicsFont.arrow,
              styles.icon,
              iconClassName,
            )}
          />
        }
      >
        {children}
      </IconLine>
    </a>
  );
};

export default LinkLine;
