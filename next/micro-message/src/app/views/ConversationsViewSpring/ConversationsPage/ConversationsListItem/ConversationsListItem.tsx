import { ListItem, ListItemText } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { memo } from 'react';

import type { FormattedConversation } from '../../../../services';
import { useThreadInfoDisplay } from '../../../MessageThreadsView/useThreadInfoDisplay';
import type { ConversationsPanelSpringProps } from '../../Conversations.view.interface';
import { useConversationActionButtons } from '../../useConversationActionButtons';

export type ConversationsListItemProps = {
  conversation: FormattedConversation;
  index: number;
} & Pick<
  ConversationsPanelSpringProps,
  | 'useConversationItemInfo'
  | 'useActionsHandler'
  | 'useItemRender'
  | 'showLogPopover'
  | 'typeFilter'
  | 'createNewEntityTooltip'
>;

const _ConversationsListItem: React.FC<ConversationsListItemProps> = ({
  typeFilter,
  conversation,
  index,
  useConversationItemInfo,
  useActionsHandler,
  useItemRender,
  showLogPopover,
  createNewEntityTooltip,
}) => {
  const {
    info,
    actions,
    extensionId,
    threadInfo,
    queueName: itemQueueName,
  } = useConversationItemInfo(conversation);

  const onAction = useActionsHandler(
    conversation,
    info,
    // eslint-disable-next-line no-nested-ternary
    typeFilter === 'Text'
      ? 'Text list'
      : typeFilter === 'Fax'
        ? 'Fax list'
        : 'Voicemail list',
  );

  useItemRender?.(conversation, index);

  const {
    DisplayName,
    displayType,
    Avatar,
    Unread,
    unreadCounts,
    displayDescription,
    isFax,
    isTextMessage,
    creationTime,
    logged,
  } = info;

  const { ThreadStatus, queueName: threadQueueName } = useThreadInfoDisplay({
    info: threadInfo,
    extensionId,
    onAction,
  });
  const queueName = itemQueueName ?? threadQueueName;

  const buttons = useConversationActionButtons({
    actions,
    conversation,
    showLogPopover,
    onAction,
    createNewEntityTooltip,
  });

  return (
    <>
      <ListItem
        key={conversation.conversationId}
        data-sign="conversationItem"
        size="auto"
        className="group"
        clickable={!isFax}
        classes={{
          content: 'bg-inherit !px-3 !py-2', // need ! because its not overriding SpringUI styles without it
        }}
        onClick={() => {
          onAction('viewDetail');
        }}
      >
        <Unread className="mr-1 -ml-3" data-sign="unread-conversationItem" />
        <Avatar />
        <ListItemText
          primary={
            <div
              className={clsx('flex items-center gap-1 truncate', {
                'font-bold': unreadCounts > 0,
              })}
              data-sign="currentName"
              data-display-type={displayType}
            >
              <DisplayName
                displayControl={{
                  maybe: true,
                  matchCounts: true,
                }}
              />
            </div>
          }
          secondary={
            queueName ? (
              <>
                <div>{displayDescription}</div>
                <div
                  className="truncate text-neutral-b2"
                  data-sign="conversationQueueName"
                  title={queueName}
                >
                  {queueName}
                </div>
              </>
            ) : (
              displayDescription
            )
          }
        />
        <div className="text-right min-h-11">
          <div className="flex items-center gap-1 justify-end">
            {
              // only text message need show the unread count, other types always only have one unread, so not need the unread count
              isTextMessage ? (
                <Unread type="standard" color="secondary" size="small" />
              ) : null
            }
            <ThreadStatus />
            <span
              className="typography-descriptor text-neutral-b2"
              data-sign="conversationItemTime"
            >
              {creationTime}
            </span>
          </div>
          {logged}
        </div>

        {buttons}
      </ListItem>
    </>
  );
};

export const ConversationsListItem = memo(_ConversationsListItem);
