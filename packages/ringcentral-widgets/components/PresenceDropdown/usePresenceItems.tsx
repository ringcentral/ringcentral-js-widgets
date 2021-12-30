import React from 'react';

import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import DndStatus from '@ringcentral-integration/commons/modules/Presence/dndStatus';
import { RcPresenceType } from '@ringcentral/juno';

import { PresenceItem, PresenceItemProps } from '../PresenceItem';

type UsePresenceItemsParams = {
  onChange: (type: RcPresenceType) => void;
  currentLocale: string;
  userStatus: unknown;
  dndStatus: unknown;
};

export const usePresenceItems = ({
  onChange,
  currentLocale,
  userStatus,
  dndStatus,
}: UsePresenceItemsParams) => {
  const items: PresenceItemProps[] = [
    {
      type: 'available',
      userStatus: presenceStatus.available,
      selected:
        userStatus === presenceStatus.available &&
        dndStatus !== DndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'busy',
      userStatus: presenceStatus.busy,
      selected:
        userStatus === presenceStatus.busy &&
        dndStatus !== DndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'DND',
      userStatus: presenceStatus.busy,
      dndStatus: DndStatus.doNotAcceptAnyCalls,
      selected: dndStatus === DndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'offline',
      userStatus: presenceStatus.offline,
      selected:
        userStatus === presenceStatus.offline &&
        dndStatus !== DndStatus.doNotAcceptAnyCalls,
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
        dndStatus={DndStatus.takeAllCalls}
        currentLocale={currentLocale}
        onClick={() => onChange(item.type)}
        {...item}
      />
    );
  });

  return {
    selectedItem,
    elements,
  };
};
