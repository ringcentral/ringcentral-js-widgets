import {
  Auth,
  Client,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  delegate,
  injectable,
  PortManager,
  RcModule,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { tap } from 'rxjs';

import type {
  CallQueuePresence,
  CallQueuePresenceResponse,
  UpdateCallQueuePresenceParams,
} from './CallQueueManagement.interface';

// TODO: this is just POC and have feature toggle, still not completed yet, like error handling toast, etc.
@injectable({
  name: 'CallQueueManagement',
})
export class CallQueueManagement extends RcModule {
  constructor(
    private _auth: Auth,
    private _client: Client,
    private _portManager: PortManager,
  ) {
    super();
    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this._listenForReset();
      });
    } else {
      this._listenForReset();
    }
  }

  private _listenForReset() {
    this._auth.notLoggedIn$
      .pipe(
        tap(() => {
          this._resetPresenceList();
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @state
  presenceList: CallQueuePresence[] = [];

  @action
  private _setPresenceList(list: CallQueuePresence[]) {
    this.presenceList = list;
  }

  @action
  private _updatePresenceList(list: CallQueuePresence[]) {
    this.presenceList = this.presenceList.map((item) => {
      const newItem = list.find(
        (newItem) => newItem.callQueue.id === item.callQueue.id,
      );
      return newItem || item;
    });
  }

  @action
  private _resetPresenceList() {
    this.presenceList = [];
  }

  @delegate('server')
  private async _fetchPresenceList() {
    const result = await this._client.service
      .platform()
      .get('/restapi/v1.0/account/~/extension/~/call-queue-presence');
    const response = (await result.json()) as CallQueuePresenceResponse;
    this._setPresenceList(response.records);
    return this.presenceList;
  }

  @delegate('server')
  private async _updatePresence(items: UpdateCallQueuePresenceParams[]) {
    const result = await this._client.service
      .platform()
      .put('/restapi/v1.0/account/~/extension/~/call-queue-presence', {
        records: items,
      });
    const response = (await result.json()) as CallQueuePresenceResponse;
    this._updatePresenceList(response.records);
  }

  updatePresence(items: UpdateCallQueuePresenceParams[]) {
    return this._updatePresence(items);
  }

  fetchPresenceList() {
    return this._fetchPresenceList();
  }
}
