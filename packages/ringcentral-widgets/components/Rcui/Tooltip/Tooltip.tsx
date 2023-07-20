import type { FunctionComponent } from 'react';
import React from 'react';

import type { RcTooltipProps } from '@ringcentral/juno';
import { RcTooltip } from '@ringcentral/juno';

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
