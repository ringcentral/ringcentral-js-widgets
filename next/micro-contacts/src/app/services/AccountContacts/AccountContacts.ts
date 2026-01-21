import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import type ValidationError from '@rc-ex/core/lib/definitions/ValidationError';
import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';
import type {
  ContactAvatarSize,
  ContactPresence,
  ContactSource,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { batchGetApi } from '@ringcentral-integration/commons/lib/batchApiHelper';
import {
  getFilterContacts,
  getFindPhoneNumber,
  getMatchContactsByPhoneNumber,
  getSearchForPhoneNumbers,
  isAnExtension,
} from '@ringcentral-integration/commons/lib/contactHelper';
import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import {
  AccountInfo,
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  type Presence,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  logger,
  optional,
  PortManager,
  RcModule,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { join, keys, pick, reduce } from 'ramda';
import { tap } from 'rxjs';

import { CompanyContacts } from '../CompanyContacts';

import type {
  AccountContactsOptions,
  ContactPresenceStatus,
  DirectoryContacts,
  GetPresenceContext,
  PresenceMap,
  Presences,
  ProfileImages,
} from './AccountContacts.interface';
import { AccountContactsViewableManager } from './AccountContactsViewableManager';
import { produceContact } from './helper';

// one second to ensure after ttl the presence can become expired
export const PRESENCE_ENQUEUE_DELAY = 1 * 1000; // 1 second
const MAXIMUM_BATCH_GET_PRESENCE = 30;
export const DEFAULT_PRESENCE_TTL =
  // TODO: in spring-ui, the viewable presence refetch every 10s
  process.env.THEME_SYSTEM === 'spring-ui' ? 10 * 1000 : 30 * 1000; // 30 seconds
export const AccountContactsSourceName = 'company';

const PRESENCE_DATA_KEY = [
  'dndStatus',
  'presenceStatus',
  'telephonyStatus',
  'userStatus',
  'meetingStatus',
];

@injectable({
  name: 'AccountContacts',
})
export class AccountContacts extends RcModule implements ContactSource {
  @dynamic('Presence')
  private _presence?: Presence;

  private _viewableManager = new AccountContactsViewableManager(
    this._portManager,
    this._extensionInfo,
    {
      onViewable: (distinctMap) => this.handlePresenceUpdate(distinctMap),
      presenceTtl: this._presenceTtl,
    },
  );

  @computed
  private get presenceMap() {
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

  private updatePresence(responseList: PresenceInfoResponse[][]) {
    const successList: string[] = [];
    const _presenceMap: Record<string, ContactPresenceStatus> = {};
    responseList.forEach((response) => {
      response.forEach((data) => {
        if ((data as ValidationError).errorCode) {
          // eslint-disable-next-line no-console
          console.warn(data);
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

  @action
  private clear() {
    this._presenceMap = {};
    this._viewableManager.clear();
  }

  constructor(
    private _auth: Auth,
    private _client: Client,
    private _portManager: PortManager,
    private _extensionInfo: ExtensionInfo,
    private _appFeatures: AppFeatures,
    private _accountInfo: AccountInfo,
    private _companyContacts: CompanyContacts,
    @optional('AccountContactsOptions')
    private _accountContactsOptions?: AccountContactsOptions,
  ) {
    super();

    this._auth.afterLogout$
      .pipe(
        tap(() => {
          this.clear();
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  async handlePresenceUpdate(
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
      logger.error('batchGetApi error', error);
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

  getProfileImageSync(contact: IContact, size?: ContactAvatarSize) {
    if (!contact.profileImage) return undefined;

    return this._auth.getProfileImageSync(contact.profileImage, size);
  }

  getPresenceSync(contact: IContact): ContactPresence | null {
    if (!contact || !contact.id || contact.type !== 'company') {
      return null;
    }

    const extensionId = contact.id;
    const accountId = contact.account?.id;
    if (!accountId || !extensionId) return null;

    this._viewableManager.link({
      accountId,
      extensionId,
    });

    return this.presenceMap[extensionId] ?? null;
  }

  unlinkPresence(contact: IContact) {
    if (!contact || !contact.id || contact.type !== 'company') {
      return null;
    }

    const extensionId = contact.id;
    const accountId = contact.account?.id;
    if (!accountId || !extensionId) return null;

    this._viewableManager.unlink({
      accountId,
      extensionId,
    });
  }

  // URL.revokeObjectURL
  @action
  override onReset() {
    this.presences = {};
    clearTimeout(this._enqueueTimeoutId);
    this._getPresenceContexts.clear();
  }

  get _presenceTtl() {
    return this._accountContactsOptions?.presenceTtl ?? DEFAULT_PRESENCE_TTL;
  }

  get isCDCEnabled() {
    // TODO: default to true when cdc feature is ready for production.
    return this._appFeatures?.isCDCEnabled;
  }

  override _shouldInit() {
    return this._companyContacts.ready && this.pending;
  }

  override _shouldReset() {
    return !this._companyContacts.ready && this.ready;
  }

  // interface of ContactSource
  findContact(contactId: string) {
    return this.contacts.find((x) => x.id === contactId)!;
  }

  // interface of ContactSource
  filterContacts(searchFilter: string) {
    return getFilterContacts(this.contacts, searchFilter);
  }

  // interface of ContactSource
  searchForPhoneNumbers(searchString: string) {
    const { isMultipleSiteEnabled, site } = this._extensionInfo;
    return getSearchForPhoneNumbers({
      contacts: this.contacts,
      searchString,
      entityType: phoneSources.rcContact,
      options: { isMultipleSiteEnabled, siteCode: site?.code },
    });
  }

  // interface of ContactSource
  matchContactsByPhoneNumber(phoneNumber: string) {
    const { isMultipleSiteEnabled, site } = this._extensionInfo;
    const contacts = ([] as IContact[]).concat(
      process.env.THEME_SYSTEM === 'spring-ui'
        ? this.contacts
        : // TODO: this is old logic(wrong), should be removed after we full migrate to spring-ui in all projects
          this.directoryContacts.all,
      this._companyContacts.ivrContacts as IContact[],
    );
    const shouldMatchExtension = isAnExtension(
      phoneNumber,
      this._accountInfo.maxExtensionNumberLength,
    );
    return getMatchContactsByPhoneNumber({
      contacts,
      phoneNumber,
      entityType: phoneSources.rcContact,
      findPhoneNumber: getFindPhoneNumber({
        phoneNumber,
        shouldMatchExtension,
        options: {
          isMultipleSiteEnabled,
          siteCode: site?.code,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        },
      }),
    });
  }

  // interface of ContactSource
  get sourceName() {
    return AccountContactsSourceName;
  }

  // interface of ContactSource
  @computed
  get directoryContacts(): DirectoryContacts {
    return reduce(
      (result, item) => {
        if (!isBlank(item.extensionNumber)) {
          const contact = produceContact({
            item,
            profileImages: this.profileImages,
            presences: this.presences,
            sourceName: this.sourceName,
          });
          // TODO: fix type in DirectoryContacts
          result.all.push(contact as any);
          if (!contact.hidden) {
            const cdcContact = {
              ...contact,
              phoneNumbers: (contact.phoneNumbers ?? []).filter(
                (number) => !number.hidden,
              ),
            };
            // TODO: fix type in DirectoryContacts
            result.cdc.push(cdcContact as any);
          }
        }
        return result;
      },
      {
        all: [],
        cdc: [],
      } as DirectoryContacts,
      this._companyContacts.filteredContacts,
    );
  }

  // interface of ContactSource
  get contacts() {
    return this.isCDCEnabled
      ? this.directoryContacts.cdc
      : this.directoryContacts.all;
  }

  // interface of ContactSource
  @computed((that: AccountContacts) => [that._companyContacts.filteredContacts])
  get rawContacts() {
    return this._companyContacts.filteredContacts;
  }

  @computed((that: AccountContacts) => [that.contacts])
  get rcCompanyMapping() {
    const rcCompanyMapping: any = {};
    this.contacts.forEach((item: any) => {
      rcCompanyMapping[item.id] = item;
    });
    return rcCompanyMapping;
  }

  // interface of ContactSource
  get sourceReady() {
    return this.ready;
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * # All Code Below is Deprecated
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

  /**
   * @deprecated
   */
  protected _getPresenceContexts: Map<string, GetPresenceContext> = new Map();
  /**
   * @deprecated
   */
  protected _enqueueTimeoutId?: NodeJS.Timeout;
  /**
   * @deprecated
   *
   * TODO: spring-ui will be removed after all projects switch to spring-ui, should use presenceMap redux state instead
   */
  presences: Presences = {};

  /**
   * @deprecated
   */
  @state
  profileImages: ProfileImages = {};

  /**
   * @deprecated
   */
  @action
  setProfileImages(id: string, url: string) {
    this.profileImages[id] = {
      url,
    };
  }
  /**
   * @deprecated
   *
   * 1. presence should not store in redux, which will make the CTI rerender once it has some changes and dispatch some action
   * 2. make sure this.presences's changes is immutable
   * 3. If the Record feature is stable, then we should use the below implementation to make sure change is immutable
   * ```
   *  data = {
   *      ...data,
   *      [key]: this.presences[key]
   *  }
   * ```
   */
  batchFetchPresenceSuccess({
    presenceMap = {},
    ttl,
  }: {
    presenceMap?: PresenceMap;
    ttl: number;
  }) {
    const data: Presences = {};
    let isUpdated = false;
    // TODO: refactor without side effect.
    Object.keys(this.presences).forEach((key) => {
      const isExpired = Date.now() - this.presences[key].timestamp >= ttl;
      if (!isExpired) {
        // new key: use new reference: immutable
        data[key] = this.presences[key];
      } else {
        isUpdated = true;
      }
    });
    Object.keys(presenceMap).forEach((key) => {
      isUpdated = true;
      data[key] = { presence: presenceMap[key], timestamp: Date.now() };
    });
    // need to make sure this.presences is immutable
    this.presences = isUpdated ? data : this.presences;
  }

  /**
   * @deprecated should use sync way `getProfileImageSync` instead, always get url in sync way to avoid the blank image a moment
   *
   * TODO: spring-ui will be removed after all projects switch to spring-ui
   */
  @delegate('server')
  async getProfileImage(contact: IContact) {
    if (
      !contact ||
      !contact.id ||
      contact.type !== 'company' ||
      !contact.hasProfileImage
    ) {
      return null;
    }

    try {
      const response = await this._client
        .account(contact.account!.id)
        .extension(contact.id)
        .profileImage('195x195')
        .get();
      const value = URL.createObjectURL(await response.blob());

      /**
       * due to we get the profile image with cache at top Contact service, we can set the profile image directly
       */
      this.setProfileImages(contact.id, value);

      return value;
    } catch (e) {
      logger.error(`[${this.identifier}] getProfileImage fail`, e, contact);
    }

    return null;
  }

  /**
   * @deprecated
   */
  // interface of ContactSource
  @delegate('server')
  getPresence(
    contact: IContact,
    useCache = true,
  ): Promise<ContactPresence | null> {
    return new Promise((resolve) => {
      if (!contact || !contact.id || contact.type !== 'company') {
        resolve(null);
        return;
      }

      const extensionId = contact.id;
      if (
        useCache &&
        this.presences[extensionId] &&
        Date.now() - this.presences[extensionId].timestamp < this._presenceTtl
      ) {
        const { presence } = this.presences[extensionId];
        resolve(presence);
        return;
      }

      const accountId = contact.account?.id;
      if (!accountId) {
        resolve(null);
        return;
      }

      const contextKey = `${accountId}-${extensionId}`;
      const context = this._getPresenceContexts.get(contextKey);
      if (context) {
        context.callbacks.push(resolve);
      } else {
        this._getPresenceContexts.set(contextKey, {
          accountId,
          extensionId,
          callbacks: [resolve],
        });
      }

      const startProcessing = () => {
        const contexts = Array.from(this._getPresenceContexts.values());
        this._getPresenceContexts.clear();
        this._fetchPresences(contexts);
      };

      clearTimeout(this._enqueueTimeoutId!);
      if (this._getPresenceContexts.size === MAXIMUM_BATCH_GET_PRESENCE) {
        startProcessing();
      } else {
        this._enqueueTimeoutId = setTimeout(
          startProcessing,
          PRESENCE_ENQUEUE_DELAY,
        );
      }
    });
  }

  /**
   * @deprecated
   */
  async _fetchPresences(contexts: GetPresenceContext[]) {
    // request
    const responses = await this._batchFetchPresences(contexts);
    // response
    const presenceMap = reduce(
      (acc, { extensionId }) => {
        const response = responses[extensionId];
        if (response) {
          const {
            dndStatus,
            presenceStatus,
            telephonyStatus,
            userStatus,
            meetingStatus,
          } = response;
          acc[extensionId] = {
            dndStatus,
            presenceStatus,
            telephonyStatus,
            userStatus,
            meetingStatus,
          };
        } else if (this.presences[extensionId]) {
          // Should keep the previous state when fail to fetch
          acc[extensionId] = this.presences[extensionId].presence;
        }
        return acc;
      },
      {} as PresenceMap,
      contexts,
    );
    // update state
    this.batchFetchPresenceSuccess({
      presenceMap,
      ttl: this._presenceTtl,
    });
    // callback
    contexts.forEach(({ extensionId, callbacks }) => {
      const presence = presenceMap[extensionId];
      for (const resolve of callbacks) {
        try {
          resolve(presence);
        } catch (ex) {
          console.error(ex);
        }
      }
    });
  }

  /**
   * @deprecated
   */
  async _batchFetchPresences(contexts: GetPresenceContext[]) {
    const presenceSet: Record<string, PresenceInfoResponse> = {};
    try {
      const accountExtensionMap = reduce(
        (acc, { accountId, extensionId }) => {
          const extensionIds = acc[accountId] ?? [];
          if (!extensionIds.includes(extensionId)) {
            extensionIds.push(extensionId);
          }
          acc[accountId] = extensionIds;
          return acc;
        },
        {} as Record<string, string[]>,
        contexts,
      );
      const batchResponses = await Promise.all<
        (PresenceInfoResponse | ValidationError)[]
      >(
        keys(accountExtensionMap).map(async (accountId): Promise<any> => {
          if (accountExtensionMap[accountId].length > 1) {
            const extensionIds = join(',', accountExtensionMap[accountId]);
            // extract json data now so the data appears in the same format
            // as single requests
            return Promise.all(
              (
                await batchGetApi({
                  platform: this._client.service.platform(),
                  url: `/restapi/v1.0/account/${accountId}/extension/${extensionIds}/presence`,
                })
              ).map(async (resp: any) => resp.json()),
            );
          }
          // wrap single request response data in array to keep the same
          // format as batch requests
          const extensionId = accountExtensionMap[accountId][0];
          return [
            await this._client
              .account(accountId)
              .extension(extensionId)
              .presence()
              .get(),
          ];
        }),
      );

      // treat all data as batch since the data is normalized
      batchResponses.forEach((batch) =>
        batch.forEach((data) => {
          if ((data as ValidationError).errorCode) {
            console.warn(data);
            return;
          }
          const _data: PresenceInfoResponse = data;
          const { id } = _data.extension!;
          presenceSet[id!] = _data;
        }),
      );
    } catch (e) {
      console.error(e);
    }
    return presenceSet;
  }
}
