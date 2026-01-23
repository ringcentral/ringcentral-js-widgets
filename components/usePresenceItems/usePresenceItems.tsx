import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
import type { ListItemProps } from '@ringcentral/spring-ui';
import React from 'react';

import type { PresenceItemProps } from './PresenceItem';
import { PresenceItem } from './PresenceItem';

type UsePresenceItemsParams = {
  onChange: (type: 'available' | 'busy' | 'DND' | 'offline') => void;
  presenceStatus: unknown;
  dndStatus: unknown;
} & Pick<ListItemProps, 'divider' | 'className'>;

export const usePresenceItems = ({
  onChange,
  presenceStatus: presenceStatusProp,
  dndStatus: dndStatusProp,
  divider,
  className,
}: UsePresenceItemsParams) => {
  const items: PresenceItemProps[] = [
    {
      type: 'available',
      variant: 'available',
      presenceStatus: presenceStatus.available,
      selected:
        presenceStatusProp === presenceStatus.available &&
        dndStatusProp !== dndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'busy',
      variant: 'busy',
      presenceStatus: presenceStatus.busy,
      selected:
        presenceStatusProp === presenceStatus.busy &&
        dndStatusProp !== dndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'DND',
      variant: 'dnd',
      presenceStatus: presenceStatus.busy,
      dndStatus: dndStatus.doNotAcceptAnyCalls,
      selected: dndStatusProp === dndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'offline',
      variant: 'unavailable',
      presenceStatus: presenceStatus.offline,
      selected:
        presenceStatusProp === presenceStatus.offline &&
        dndStatusProp !== dndStatus.doNotAcceptAnyCalls,
    },
  ];
  let selectedItem: PresenceItemProps | undefined;

  const elements = items.map((item, key) => {
    if (item.selected) {
      selectedItem = item;
    }
    return (
      <PresenceItem
        key={key}
        dndStatus={dndStatus.takeAllCalls}
        onClick={() => onChange(item.type)}
        divider={divider}
        className={className}
        {...item}
      />
    );
  });

  return {
    selectedItem,
    elements,
  };
};
