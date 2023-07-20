import type { FunctionComponent } from 'react';
import React from 'react';

import type { RcTooltipProps } from '@ringcentral/juno';
import { RcTooltip } from '@ringcentral/juno';

import styles from './styles.scss';

interface ExtendedTooltipProps {
  hasScrollBar: boolean;
}

export const ExtendedTooltip: FunctionComponent<
  ExtendedTooltipProps & RcTooltipProps
> = ({ hasScrollBar, children, ...res }) => {
  const isMac = navigator.platform.includes('Mac');
  return (
    <RcTooltip
      classes={{
        popper: isMac || !hasScrollBar ? styles.popper : styles.popperOfWin,
        tooltip: styles.tooltip,
      }}
      placement="bottom"
      {...res}
    >
      {children}
    </RcTooltip>
  );
};
