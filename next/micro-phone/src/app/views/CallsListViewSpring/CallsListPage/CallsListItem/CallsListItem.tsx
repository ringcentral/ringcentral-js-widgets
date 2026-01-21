import {
  ActionMenuList,
  useHistoryActionButtons,
} from '@ringcentral-integration/next-widgets/components';
import { ListItem, ListItemText } from '@ringcentral/spring-ui';
import React, { memo } from 'react';

import { type CallsListPanelSpringProps } from '../../CallsList.view.interface';

export type CallsListItemProps = {
  call: CallsListPanelSpringProps['calls'][0];
  index: number;
} & Omit<
  CallsListPanelSpringProps,
  'calls' | 'lastPosition' | 'setLastPosition' | 'viewCallsFilterSelections'
>;

const _CallsListItem: React.FC<CallsListItemProps> = ({
  call,
  index,
  useCallHistoryItemInfo,
  useActionsHandler,
  useItemRender,
}) => {
  const { info, actions } = useCallHistoryItemInfo(call, {
    // TODO: support select contact
    selectIndex: 0,
    variant: 'list',
  });
  const onAction = useActionsHandler(call, info, 'Call history list');

  useItemRender?.(call, index);

  const {
    Avatar,
    DisplayName,
    Status,
    startTime,
    logged,
    answeredByDelegate,
    ringingElsewhere,
  } = info;
  const buttons = useHistoryActionButtons(actions, onAction);

  return (
    <ListItem
      key={call.id}
      size="auto"
      className="group"
      classes={{
        content: 'bg-inherit !px-3 !py-2', // need ! because its not overriding SpringUI styles without it
      }}
      onClick={() => onAction('viewDetail')}
      data-sign="callsListItem"
    >
      <Avatar />
      <ListItemText
        classes={{
          primaryPrimaryText:
            ringingElsewhere &&
            // when no delegate target, means that call still ringing, show green
            !answeredByDelegate
              ? 'text-success-f'
              : undefined,
        }}
        primary={
          <div className="flex flex-col items-start gap-0.5 truncate">
            <DisplayName
              displayControl={{
                maybe: true,
                matchCounts: true,
              }}
            />
          </div>
        }
        secondary={Status ? <Status mode="icon" /> : undefined}
      />
      <div className="text-right min-h-11 max-w-[30%]">
        <span
          className="typography-descriptor text-neutral-b2"
          data-sign="callStartTime"
        >
          {startTime}
        </span>
        {logged}
      </div>
      <ActionMenuList buttons={buttons} />
    </ListItem>
  );
};

export const CallsListItem = memo(_CallsListItem);
