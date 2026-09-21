import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import type ValidationError from '@rc-ex/core/lib/definitions/ValidationError';
import {
  Auth,
  Client,
  ExtensionInfo,
  type Presence,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ViewableManager } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  PortManager,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { pick } from 'ramda';
import { tap } from 'rxjs';

import type {
  AccountContactsOptions,
  ContactPresenceStatus,
} from './AccountContacts.interface';

interface AccountContactDetails {
  accountId: string;
  extensionId: string;
}

export const DEFAULT_PRESENCE_TTL =
  // TODO: in spring-ui, the viewable presence refetch every 10s
  process.env.THEME_SYSTEM === 'spring-ui' ? 10 * 1000 : 30 * 1000; // 30 seconds

export const PRESENCE_DATA_KEY = [
  'dndStatus',
  'presenceStatus',
  'telephonyStatus',
  'userStatus',
  'meetingStatus',
];

@injectable({
  name: 'AccountContactsViewableManager',
})
export class AccountContactsViewableManager extends ViewableManager<AccountContactDetails> {
  @dynamic('Presence')
  private _presence?: Presence;

  @computed
  get presenceMap() {
    const data = this._presence?.data;
    // own presence use the presence data from presence service
    if (this._extensionInfo.id && data) {
      return {
        ...this._presenceMap,
        [this._extensionInfo.id]: pick(PRESENCE_DATA_KEY, data),
      };
    }

    return this._presenceMap;
  }

  @state
  private _presenceMap: Record<string, ContactPresenceStatus> = {};

  @action
  private _updatePresenceMap(data: Record<string, ContactPresenceStatus>) {
    Object.entries(data).forEach(([key, value]) => {
      if (this._presenceMap[key]) {
        // for ensure patch the smallest data
        Object.assign(this._presenceMap[key], value);
      } else {
        this._presenceMap[key] = value;
      }
    });
  }

  @action
  private clear() {
    this._presenceMap = {};
    this.viewableManager.clear();
  }

  get presenceTtl() {
    return this._accountContactsOptions?.presenceTtl ?? DEFAULT_PRESENCE_TTL;
  }

  constructor(
    protected override _portManager: PortManager,
    private _auth: Auth,
    private _client: Client,
    private _extensionInfo: ExtensionInfo,
    @optional('AccountContactsOptions')
    private _accountContactsOptions?: AccountContactsOptions,
  ) {
    super(_portManager, {
      viewableManagerOptions: {
        ttl: _accountContactsOptions?.presenceTtl ?? DEFAULT_PRESENCE_TTL,
        groupKey: 'accountId',
        itemKey: 'extensionId',
        maxBatchRequestCount: 30,
        validate: (data) => +data.extensionId !== this._extensionInfo.id,
      },
      onViewable: (distinctMap) => {
        const result = this.handlePresenceUpdate(distinctMap);

        return result;
      },
    });

    this._auth.afterLogout$
      .pipe(
        tap(() => {
          this.clear();
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  link(contact: AccountContactDetails) {
    this.viewableManager.link(contact);
  }

  unlink(contact: AccountContactDetails) {
    this.viewableManager.unlink(contact);
  }

  private async handlePresenceUpdate(
    distinctMap: [string, string[]][],
  ): Promise<string[]> {
    try {
      const responseList = await Promise.all(
        distinctMap.map(async ([accountId, extensionIdList]) => {
          const ids = extensionIdList.join(',');

          const result = await this.batchGetApi(
            `/restapi/v1.0/account/${accountId}/extension/${ids}/presence`,
          );

          return result;
        }),
      );

      return this.updatePresence(responseList);
    } catch (error) {
      this.logger.error('batchGetApi error', error);
      return [];
    }
  }

  @delegate('server')
  private async batchGetApi(url: string) {
    const result: PresenceInfoResponse[] = await this._client.multipart.get(
      url,
      {
        batch: true,
      },
    );

    return result;
  }

  private updatePresence(responseList: PresenceInfoResponse[][]) {
    const successList: string[] = [];
    const _presenceMap: Record<string, ContactPresenceStatus> = {};
    responseList.forEach((response) => {
      response.forEach((data) => {
        if ((data as ValidationError).errorCode) {
          this.logger.warn(data);
        } else {
          const { id } = data.extension!;
          const presence = pick(PRESENCE_DATA_KEY, data);
          const extensionId = id!;
          _presenceMap[extensionId] = presence;

          successList.push(extensionId.toString());
        }
      });
    });
    this._updatePresenceMap(_presenceMap);

    return successList;
  }
}
