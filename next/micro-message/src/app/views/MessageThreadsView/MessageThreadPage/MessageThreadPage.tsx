import React, { forwardRef } from 'react';

import { t as conversationsT } from '../../ConversationsViewSpring/ConversationsPage/i18n';
import type { MessageThreadPanelProps } from '../MessageThreads.view.interface';

import { Filter } from './Filter';
import { MessageThreadList } from './MessageThreadList';

export const MessageThreadPage = forwardRef<
  HTMLDivElement,
  MessageThreadPanelProps
>(
  (
    {
      form,
      threadConversations,
      lastPosition,
      loading,
      showLogPopover,
      createNewEntityTooltip,
      onSharedSearchFormUpdate,
      setLastPosition,
      useConversationItemInfo,
      useActionsHandler,
      useItemRender,
      onEndReached,
      callQueues,
      assignmentOptions,
    },
    ref,
  ) => {
    const searchMode = form.searchInput.length > 0;

    return (
      <div data-sign="MessageThreadPage" className="flex flex-col h-full">
        <div
          ref={ref}
          className="flex flex-col flex-auto overflow-hidden h-full"
        >
          <Filter
            form={form}
            onSharedSearchFormUpdate={onSharedSearchFormUpdate}
            callQueues={callQueues}
            assignmentOptions={assignmentOptions}
          />
          <MessageThreadList
            threadConversations={threadConversations}
            className="flex-auto overflow-auto"
            lastPosition={lastPosition}
            loading={loading}
            setLastPosition={setLastPosition}
            useConversationItemInfo={useConversationItemInfo}
            useActionsHandler={useActionsHandler}
            useItemRender={useItemRender}
            showLogPopover={showLogPopover}
            createNewEntityTooltip={createNewEntityTooltip}
            notFoundMessage={
              searchMode
                ? conversationsT('noSearchResults')
                : conversationsT('noText')
            }
            onEndReached={onEndReached}
          />
        </div>
      </div>
    );
  },
);

MessageThreadPage.displayName = 'MessageThreadPage';
