import {
  injectable,
  optional,
  RcViewModule,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import React from 'react';

import { MessageThread } from '../../services';

import type { ConversationViewSpringProps } from './Conversation.view.interface';
import { PersonalConversationViewSpring } from './PersonalConversation.view';
import { SharedConversationView } from './SharedConversation.view';

@injectable({
  name: 'ConversationViewSpring',
})
export class ConversationViewSpring extends RcViewModule {
  constructor(
    private _personalConversationView: PersonalConversationViewSpring,
    @optional() private _messageThread?: MessageThread,
    @optional()
    private _sharedConversationView?: SharedConversationView,
  ) {
    super();
  }

  component(props: ConversationViewSpringProps) {
    const { conversationId } = useParams<{ conversationId: string }>();

    const isThread = useConnector(() => {
      if (!conversationId || !this._messageThread) {
        return false;
      }
      return this._messageThread.isThreadId(conversationId);
    });

    if (this._sharedConversationView && isThread) {
      return (
        <this._sharedConversationView.component
          conversationId={conversationId}
          {...props}
        />
      );
    }

    return <this._personalConversationView.component {...props} />;
  }
}
