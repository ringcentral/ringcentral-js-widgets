import {
  injectable,
  RcViewModule,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import React from 'react';

import { MessageThread, QueueConversations } from '../../services';

import type { ConversationViewSpringProps } from './Conversation.view.interface';
import { PersonalConversationViewSpring } from './PersonalConversation.view';
import { QueueConversationView } from './QueueConversation.view';
import { SharedConversationView } from './SharedConversation.view';

@injectable({
  name: 'ConversationViewSpring',
})
export class ConversationViewSpring extends RcViewModule {
  constructor(
    private _personalConversationView: PersonalConversationViewSpring,
    private _queueConversationView: QueueConversationView,
    private _queueConversations: QueueConversations,
    private _messageThread: MessageThread,
    private _sharedConversationView: SharedConversationView,
  ) {
    super();
  }

  component(props: ConversationViewSpringProps) {
    const { conversationId } = useParams<{ conversationId: string }>();

    const isThread = useConnector(() => {
      if (!conversationId) return false;

      return this._messageThread.isThreadId(conversationId);
    });

    const isQueueConversation = useConnector(() => {
      if (!conversationId) return false;

      return this._queueConversations.formattedConversationsMap.has(
        conversationId,
      );
    });

    if (isThread) {
      return (
        <this._sharedConversationView.component
          conversationId={conversationId}
          {...props}
        />
      );
    }

    if (isQueueConversation) {
      return <this._queueConversationView.component {...props} />;
    }

    return <this._personalConversationView.component {...props} />;
  }
}
