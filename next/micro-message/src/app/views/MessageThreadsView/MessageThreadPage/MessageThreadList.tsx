import { useVirtuosoScrollPosition } from '@ringcentral-integration/react-hooks';
import NoText from '@ringcentral-integration/next-core/assets/no_text.svg';
import {
  Skeleton,
  SkeletonContainer,
  VirtualizedList,
  Divider,
} from '@ringcentral/spring-ui';
import React from 'react';
import type { StateSnapshot } from 'react-virtuoso';

import type { MessageThread } from '../../../services';
import type { ConversationsPanelSpringProps } from '../../ConversationsViewSpring/Conversations.view.interface';
import { ConversationsListItem } from '../../ConversationsViewSpring/ConversationsPage/ConversationsListItem';

export type MessageThreadListProps = {
  threadConversations: MessageThread['threadConversationsInfo']['conversations'];
  className?: string;
  lastPosition?: StateSnapshot;
  loading?: boolean;
  setLastPosition: (page: string, val?: StateSnapshot) => void;
  useConversationItemInfo: ConversationsPanelSpringProps['useConversationItemInfo'];
  useActionsHandler: ConversationsPanelSpringProps['useActionsHandler'];
  useItemRender?: ConversationsPanelSpringProps['useItemRender'];
  showLogPopover?: ConversationsPanelSpringProps['showLogPopover'];
  createNewEntityTooltip?: ConversationsPanelSpringProps['createNewEntityTooltip'];
  notFoundMessage?: React.ReactNode;
  onEndReached: () => void;
};

const Footer = () => {
  return (
    <SkeletonContainer>
      {Array.from({ length: 5 }).map((_, i) => (
        <React.Fragment key={i}>
          <div className="px-4">
            <div className="flex gap-3 items-center py-3">
              <Skeleton variant="circular" className="size-9" />
              <div className="flex flex-col flex-1">
                <Skeleton
                  variant="text"
                  className="w-3/4 typography-subtitle"
                />
                <Skeleton
                  variant="text"
                  className="w-1/2 typography-descriptor"
                />
              </div>
            </div>
            <Divider />
          </div>
        </React.Fragment>
      ))}
    </SkeletonContainer>
  );
};

export const MessageThreadList: React.FC<MessageThreadListProps> = ({
  threadConversations,
  className,
  lastPosition,
  loading,
  setLastPosition,
  useConversationItemInfo,
  useActionsHandler,
  useItemRender,
  showLogPopover,
  createNewEntityTooltip,
  notFoundMessage,
  onEndReached,
}) => {
  const { virtuosoActionsRef, scrollerRef } = useVirtuosoScrollPosition(
    (snapshot) => setLastPosition('shared', snapshot),
  );

  if (threadConversations.length === 0 && !loading) {
    return (
      <div className="flex-auto flex justify-center items-center overflow-y-auto overflow-x-hidden">
        <div className="flex-col flex justify-center items-center gpa-4">
          {notFoundMessage ? (
            <>
              <NoText />
              <div className="text-center text-14 text-gray-500 mt-4">
                {notFoundMessage}
              </div>
            </>
          ) : (
            <NoText />
          )}
        </div>
      </div>
    );
  }

  const components = loading
    ? {
        Footer,
      }
    : undefined;

  return (
    <VirtualizedList
      key="shared"
      className={className}
      data={threadConversations}
      data-sign="sharedMessageThreadList"
      virtuosoActions={virtuosoActionsRef}
      scrollerRef={scrollerRef}
      restoreStateFrom={lastPosition || undefined}
      increaseViewportBy={200}
      endReached={onEndReached}
      components={components}
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
          typeFilter="Text"
          createNewEntityTooltip={createNewEntityTooltip}
        />
      )}
    </VirtualizedList>
  );
};
