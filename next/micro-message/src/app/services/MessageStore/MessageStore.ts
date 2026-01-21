import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import * as messageHelper from '@ringcentral-integration/commons/lib/messageHelper';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings/callingModes';
import {
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ConnectivityMonitor,
  DataFetcher,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import type { CallingSettings } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';

import { MessageStoreEventSubscriber } from '../MessageStoreEventSubscriber';

import type { MessageStoreOptions } from './MessageStore.interface';
import { MessageStoreBase } from './MessageStoreBase';

@injectable({
  name: 'MessageStore',
})
export class MessageStore extends MessageStoreBase {
  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected override _connectivityMonitor: ConnectivityMonitor,
    protected override _appFeatures: AppFeatures,
    protected override _messageEventSubscriber: MessageStoreEventSubscriber,
    @optional()
    protected override _availabilityMonitor?: AvailabilityMonitor,
    @optional('TabManager') protected override _tabManager?: any,
    @optional('MessageStoreOptions')
    protected override _messageStoreOptions?: MessageStoreOptions,
  ) {
    super(
      _toast,
      _auth,
      _client,
      _dataFetcher,
      _connectivityMonitor,
      _appFeatures,
      _messageEventSubscriber,
      _availabilityMonitor,
      _tabManager,
      {
        ..._messageStoreOptions,
        messageStoreKey: 'messageStore',
      },
    );
  }

  @dynamic('CallingSettings')
  protected readonly _callingSettings?: CallingSettings;

  override get _hasPermission() {
    // check all message types
    return this._appFeatures.hasReadMessagesPermission;
  }

  /**
   * NOTE:
   * This is temporary function, should be removed once sending is supported in all apps
   * @param message
   * @returns
   */
  override _messageIsAcceptable(message: Message) {
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      return !messageHelper.messageIsDeleted(message);
    }
    return messageHelper.messageIsAcceptable(message);
  }

  @track(trackEvents.clickToSMSVoicemailList)
  @delegate('server')
  async onClickToSMS() {
    // for track click to sms in message list
  }

  @track((_: MessageStore, action: { fromType?: Message['type'] }) => {
    if (action.fromType === 'Pager' || action.fromType === 'SMS') {
      return [trackEvents.clickToDialTextList];
    }
    if (action.fromType === 'VoiceMail') {
      return [trackEvents.clickToDialVoicemailList];
    }
  })
  @delegate('server')
  async onClickToCall({ fromType = '' }) {
    // for track click to call in message list
    this.onClickToCallWithRingout();
  }

  @track((that: MessageStore) => {
    if (that._callingSettings?.callingMode === callingModes.ringout) {
      return [trackEvents.callPlaceRingOutCallSMSHistory];
    }
  })
  @delegate('server')
  async onClickToCallWithRingout() {
    // for track click to call with Ringout in message list
  }

  @computed
  get textConversations() {
    return this.allConversations.filter((conversation) =>
      messageHelper.messageIsTextMessage(conversation),
    );
  }

  @computed
  get smsConversations() {
    return this.allConversations.filter(
      (conversation) =>
        conversation.type === messageTypes.sms && conversation.conversationId,
    );
  }

  @computed
  get textUnreadCounts() {
    return this.textConversations.reduce((a, b) => a + b.unreadCounts, 0);
  }

  @computed
  get faxMessages() {
    return this.allConversations.filter((conversation) =>
      messageHelper.messageIsFax(conversation),
    );
  }

  @computed
  get faxUnreadCounts() {
    return this.faxMessages.reduce((a, b) => a + b.unreadCounts, 0);
  }

  @computed
  get voicemailMessages() {
    return this.allConversations.filter((conversation) =>
      messageHelper.messageIsVoicemail(conversation),
    );
  }

  @computed
  get voiceUnreadCounts() {
    return this.voicemailMessages.reduce((a, b) => a + b.unreadCounts, 0);
  }

  @computed
  override get unreadCounts() {
    let unreadCounts = 0;
    if (this._appFeatures.hasReadTextPermission) {
      unreadCounts += this.textUnreadCounts;
    }
    if (this._appFeatures.hasVoicemailPermission) {
      unreadCounts += this.voiceUnreadCounts;
    }
    if (this._appFeatures.hasReadFaxPermission) {
      unreadCounts += this.faxUnreadCounts;
    }
    return unreadCounts;
  }
}
