import {
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ConnectivityMonitor,
  DataFetcher,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { injectable, optional } from '@ringcentral-integration/next-core';

import { MessageStoreBase } from '../MessageStore/MessageStoreBase';
import { MessageStoreEventSubscriber } from '../MessageStoreEventSubscriber';

import type { VoicemailMessageStoreOptions } from './VoicemailMessageStore.interface';

@injectable({
  name: 'VoicemailMessageStore',
})
export class VoicemailMessageStore extends MessageStoreBase {
  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected override _connectivityMonitor: ConnectivityMonitor,
    protected override _messageEventSubscriber: MessageStoreEventSubscriber,
    protected override _appFeatures: AppFeatures,
    @optional()
    protected override _availabilityMonitor?: AvailabilityMonitor,
    @optional('TabManager') protected override _tabManager?: any,
    @optional('VoicemailMessageStoreOptions')
    protected override _messageStoreOptions?: VoicemailMessageStoreOptions,
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
        messageType: ['VoiceMail'],
        messageStoreKey: 'voicemailMessageStore',
      },
    );
  }

  override get _hasPermission() {
    return this._appFeatures.hasVoicemailPermission;
  }
}
