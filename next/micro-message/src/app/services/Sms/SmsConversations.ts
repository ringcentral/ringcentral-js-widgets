import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';

import type { FormattedConversation } from '../Conversations/Conversations.interface';

import type { SmsConversationsOptions } from './SmsConversations.interface';

@injectable({
  name: 'SmsConversations',
})
export class SmsConversations extends RcModule {
  constructor(
    @optional('SmsConversationsOptions')
    protected _conversationsOptions?: SmsConversationsOptions,
  ) {
    super();
  }

  private _supportLogMessageTypes = this._conversationsOptions
    ?.supportCRMLogMessageTypes || [messageTypes.sms, messageTypes.pager];

  checkIsSupportLog(formattedConversation: FormattedConversation | undefined) {
    if (
      !formattedConversation ||
      !formattedConversation.type ||
      // currently, we only support log SMS for one-to-one conversation
      formattedConversation.to?.length !== 1
    ) {
      return false;
    }

    return this._supportLogMessageTypes.includes(formattedConversation.type);
  }
}
