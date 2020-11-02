import { RcTooltip, RcTooltipProps } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

export type TooltipProps = Omit<RcTooltipProps, 'size'>;

export const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  title,
  ...rest
}) => {
  if (!title) return children;
  return (
    <RcTooltip
      size="medium"
      title={<span className={styles.title}>{title}</span>}
      {...rest}
    >
      {children}
    </RcTooltip>
  );
};
