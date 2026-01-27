import type MessageEvent from '@rc-ex/core/lib/definitions/MessageEvent';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';
import { filter } from 'rxjs';

import type { MessageStoreEventSubscriberOptions } from './MessageStoreEventSubscriber.interface';

@injectable({
  name: 'MessageStoreEventSubscriber',
})
export class MessageStoreEventSubscriber extends RcModule {
  constructor(
    protected _appFeatures: AppFeatures,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('TabManager') protected _tabManager?: any,
    @optional('MessageStoreEventSubscriberOptions')
    protected _messageStoreEventSubscriberOptions?: MessageStoreEventSubscriberOptions,
  ) {
    super();

    this._subscription?.register(this, {
      filters: [
        subscriptionFilters.messageStore,
        subscriptionFilters.instantMessage,
      ],
    });
  }

  get _hasPermission() {
    return this._appFeatures.hasReadMessagesPermission;
  }

  messageEvents = this.getMessageEvents$();

  private getMessageEvents$() {
    const _subscription = this._subscription;
    if (!_subscription) return;

    const messageStore$ = _subscription
      .fromMessage$<MessageEvent['body']>(/\/message-store$/)
      .pipe(filter(() => this._hasPermission));
    const instantMessage$ = _subscription
      .fromMessage$<MessageEvent['body']>(/\/message-store\/instant\?type=SMS$/)
      .pipe(filter(() => this._hasPermission));

    return {
      messageStore$,
      instantMessage$,
    };
  }
}
