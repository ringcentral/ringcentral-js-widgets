import type { RcTooltipProps } from '@ringcentral/juno';
import { RcTooltip } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import { StyledTitle } from './styles';

export type TooltipProps = RcTooltipProps;

export const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  title,
  size = 'medium',
  ...rest
}) => {
  if (!title) return children;

  return (
    <RcTooltip size={size} title={<StyledTitle>{title}</StyledTitle>} {...rest}>
      {children}
    </RcTooltip>
  );
};
