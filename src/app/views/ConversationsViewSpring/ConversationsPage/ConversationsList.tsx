import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useVirtuosoScrollPosition } from '@ringcentral-integration/react-hooks';
import NoFax from '@ringcentral-integration/next-core/assets/no_fax.svg';
import NoText from '@ringcentral-integration/next-core/assets/no_text.svg';
import NoVoiceMail from '@ringcentral-integration/next-core/assets/no_voicemail.svg';
import { VirtualizedList } from '@ringcentral/spring-ui';
import React, { ComponentType } from 'react';

import { ConversationsPanelSpringProps } from '../Conversations.view.interface';

import { ConversationsListItem } from './ConversationsListItem';
import i18n, { type I18nKey } from './i18n';

export type ConversationsListProps = Omit<
  ConversationsPanelSpringProps,
  | 'onSearchInputChange'
  | 'goToComposeText'
  | 'initTypeFilter'
  | 'updateReadStatusFilterMap'
  | 'searchInput'
> & {
  className?: string;
};

const noDataComponentMap: Record<
  'All' | 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text',
  ComponentType<{ message?: React.ReactNode }>
> = {
  All: () => null,
  SMS: () => null,
  Pager: () => null,
  Text: ({ message }) => (
    <>
      <NoText />
      <div className="text-center text-14 text-gray-500 mt-2">{message}</div>
    </>
  ),
  Fax: ({ message }) => (
    <>
      <NoFax />
      <div className="text-center text-14 text-gray-500 mt-2">{message}</div>
    </>
  ),
  VoiceMail: ({ message }) => (
    <>
      <NoVoiceMail />
      <div className="text-center text-14 text-gray-500 mt-2">{message}</div>
    </>
  ),
};

const noDataHintMap = {
  All: {
    Read: 'noMessages',
    Unread: 'noMessages',
    All: 'noMessages',
  },
  Fax: {
    Read: 'noFaxes',
    Unread: 'noUnreadFaxes',
    All: 'noFaxes',
  },
  SMS: {
    Read: 'noMessages',
    Unread: 'noMessages',
    All: 'noMessages',
  },
  VoiceMail: {
    Read: 'noVoicemail',
    Unread: 'noVoicemail',
    All: 'noVoicemail',
  },
  Pager: {
    Read: 'noMessages',
    Unread: 'noMessages',
    All: 'noMessages',
  },
  Text: {
    Read: 'noText',
    Unread: 'noUnreadText',
    All: 'noText',
  },
};

export const ConversationsList: React.FC<
  ConversationsListProps & {
    notFoundMessage?: React.ReactNode;
  }
> = (props) => {
  const {
    conversations,
    className,
    notFoundMessage,
    useActionsHandler,
    useConversationItemInfo,
    useItemRender,
    lastPosition,
    setLastPosition,
    showLogPopover,
    typeFilter,
    readStatusFilter,
    createNewEntityTooltip,
    // ...rest
  } = props;
  const { t } = useLocale(i18n);

  const { virtuosoActionsRef, scrollerRef } = useVirtuosoScrollPosition(
    (snapshot) =>
      setLastPosition(`${typeFilter}-${readStatusFilter}`, snapshot),
  );

  if (conversations.length === 0) {
    const NoComponent = noDataComponentMap[typeFilter];

    return (
      <div className="flex-auto flex justify-center items-center overflow-y-auto overflow-x-hidden">
        <div className="flex-col flex justify-center items-center gpa-4">
          {NoComponent ? (
            <NoComponent
              message={
                notFoundMessage ??
                t(noDataHintMap[typeFilter][readStatusFilter] as I18nKey)
              }
            />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <VirtualizedList
      key={`${typeFilter}-${readStatusFilter}`}
      className={className}
      data={conversations}
      data-sign="conversationList"
      virtuosoActions={virtuosoActionsRef}
      scrollerRef={scrollerRef}
      // null is not a valid type for restoreStateFrom, if lastPosition is null, it should use undefined
      restoreStateFrom={lastPosition || undefined}
    >
      {(index, conversation) => (
        <ConversationsListItem
          key={conversation.conversationId}
          conversation={conversation}
          index={index}
          useActionsHandler={useActionsHandler}
          useConversationItemInfo={useConversationItemInfo}
          useItemRender={useItemRender}
          showLogPopover={showLogPopover}
          typeFilter={typeFilter}
          createNewEntityTooltip={createNewEntityTooltip}
        />
      )}
    </VirtualizedList>
  );
};
