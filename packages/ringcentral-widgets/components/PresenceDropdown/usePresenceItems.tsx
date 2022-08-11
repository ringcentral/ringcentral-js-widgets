import React from 'react';

import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
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
  dndStatus: dndStatusProp,
}: UsePresenceItemsParams) => {
  const items: PresenceItemProps[] = [
    {
      type: 'available',
      userStatus: presenceStatus.available,
      selected:
        userStatus === presenceStatus.available &&
        dndStatusProp !== dndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'busy',
      userStatus: presenceStatus.busy,
      selected:
        userStatus === presenceStatus.busy &&
        dndStatusProp !== dndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'DND',
      userStatus: presenceStatus.busy,
      dndStatus: dndStatus.doNotAcceptAnyCalls,
      selected: dndStatusProp === dndStatus.doNotAcceptAnyCalls,
    },
    {
      type: 'offline',
      userStatus: presenceStatus.offline,
      selected:
        userStatus === presenceStatus.offline &&
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
        currentLocale={currentLocale}
        // @ts-expect-error TS(2345): Argument of type 'RcPresenceType | undefined' is n... Remove this comment to see the full error message
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
