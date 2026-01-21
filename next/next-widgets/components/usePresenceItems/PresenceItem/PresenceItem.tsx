import type {
  ListItemProps,
  StatusIndicatorProps,
} from '@ringcentral/spring-ui';
import { ListItem, StatusIndicator } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { usePresenceText } from './usePresenceText';

export type PresenceItemProps = {
  className?: string;
  presenceStatus: string;
  dndStatus?: string;
  selected: boolean;
  type: 'available' | 'busy' | 'DND' | 'offline';
} & Pick<StatusIndicatorProps, 'variant' | 'onClick'> &
  Pick<ListItemProps, 'divider'>;

export const PresenceItem = forwardRef<any, PresenceItemProps>(
  (
    {
      selected,
      className,
      presenceStatus,
      dndStatus,
      onClick,
      variant,
      divider,
    },
    ref,
  ) => {
    const name = usePresenceText({ dndStatus, presenceStatus });

    return (
      <ListItem
        size="small"
        aria-label={name}
        ref={ref}
        selected={selected}
        className={clsx('typography-subtitleMini', className)}
        onClick={onClick}
        divider={divider}
      >
        <StatusIndicator size="medium" variant={variant} className="mr-3" />
        <span>{name}</span>
      </ListItem>
    );
  },
);
