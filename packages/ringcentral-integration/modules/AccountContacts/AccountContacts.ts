import { filter, forEach, join, keys, map, reduce } from 'ramda';
import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import type ValidationError from '@rc-ex/core/lib/definitions/ValidationError';
import {
  action,
  computed,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';

import { phoneSources } from '../../enums/phoneSources';
import { phoneTypes } from '../../enums/phoneTypes';
import type {
  ContactPresence,
  ContactSource,
  IContact,
} from '../../interfaces/Contact.model';
import { batchGetApi } from '../../lib/batchApiHelper';
import {
  getFilterContacts,
  getFindPhoneNumber,
  getMatchContactsByPhoneNumber,
  getSearchForPhoneNumbers,
  isAnExtension,
} from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import { isBlank } from '../../lib/isBlank';
import {
  convertUsageTypeToPhoneType,
  isSupportedPhoneNumber,
} from '../../lib/phoneTypeHelper';
import { proxify } from '../../lib/proxy/proxify';
import type {
  Contact,
  Deps,
  DirectoryContacts,
  GetPresenceContext,
  PresenceMap,
  Presences,
  ProfileImages,
} from './AccountContacts.interface';

export const PRESENCE_ENQUEUE_DELAY = 1 * 1000; // 1 second
const MAXIMUM_BATCH_GET_PRESENCE = 30;
export const DEFAULT_PRESENCE_TTL = 10 * 60 * 1000; // 10 mins
const DEFAULT_AVATAR_TTL = 2 * 60 * 60 * 1000; // 2 hour
const DEFAULT_AVATAR_QUERY_INTERVAL = 2 * 1000; // 2 seconds

@Module({
  name: 'AccountContacts',
  deps: [
    'Client',
    'ExtensionInfo',
    'AppFeatures',
    'AccountInfo',
    { dep: 'CompanyContacts' },
    { dep: 'AccountContactsOptions', optional: true },
  ],
})
export class AccountContacts extends RcModuleV2<Deps> implements ContactSource {
  protected _getPresenceContexts: Map<string, GetPresenceContext> = new Map();
  protected _enqueueTimeoutId?: NodeJS.Timeout;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  profileImages: ProfileImages = {};

  presences: Presences = {};

  @action
  fetchImageSuccess({
    imageId,
    imageUrl,
    ttl,
  }: {
    imageId: string;
    imageUrl: string;
    ttl: number;
  }) {
    const data: ProfileImages = {};
    // TODO: refactor without side effect.
    Object.keys(this.profileImages).forEach((key) => {
      if (Date.now() - this.profileImages[key].timestamp < ttl) {
        data[key] = this.profileImages[key];
      } else {
        URL.revokeObjectURL(this.profileImages[key].imageUrl);
      }
    });
    this.profileImages = data;
    this.profileImages[imageId] = {
      imageUrl,
      timestamp: Date.now(),
    };
  }

  /**
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

  @action
  override onReset() {
    // TODO: refactor without side effect.
    Object.keys(this.profileImages).forEach((key) => {
      URL.revokeObjectURL(this.profileImages[key].imageUrl);
    });
    this.profileImages = {};
    this.presences = {};
    clearTimeout(this._enqueueTimeoutId);
    this._getPresenceContexts.clear();
  }

  get _avatarTtl() {
    return this._deps.accountContactsOptions?.avatarTtl ?? DEFAULT_AVATAR_TTL;
  }

  get _presenceTtl() {
    return (
      this._deps.accountContactsOptions?.presenceTtl ?? DEFAULT_PRESENCE_TTL
    );
  }

  get _avatarQueryInterval() {
    return (
      this._deps.accountContactsOptions?.avatarQueryInterval ??
      DEFAULT_AVATAR_QUERY_INTERVAL
    );
  }

  get isCDCEnabled() {
    // TODO: default to true when cdc feature is ready for production.
    return this._deps.appFeatures?.isCDCEnabled;
  }

  override _shouldInit() {
    return this._deps.companyContacts.ready && this.pending;
  }

  override _shouldReset() {
    return !this._deps.companyContacts.ready && this.ready;
  }

  // interface of ContactSource
  @proxify
  async getProfileImage(contact: IContact, useCache = true) {
    if (
      !contact ||
      !contact.id ||
      contact.type !== 'company' ||
      !contact.hasProfileImage
    ) {
      return null;
    }

    const imageId = contact.id;
    if (
      useCache &&
      this.profileImages[imageId] &&
      Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl
    ) {
      const image = this.profileImages[imageId].imageUrl;
      return image;
    }
    let imageUrl = null;
    try {
      const response = await this._deps.client
        .account(contact.account!.id)
        .extension(contact.id)
        .profileImage('195x195')
        .get();
      imageUrl = URL.createObjectURL(await response.blob());
      this.fetchImageSuccess({
        imageId,
        imageUrl,
        ttl: this._avatarTtl,
      });
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
    }
    return imageUrl;
  }

  // interface of ContactSource
  @proxify
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

  // interface of ContactSource
  findContact(contactId: string) {
    return this.contacts.find((x) => x.id === contactId)!;
  }

  // interface of ContactSource
  filterContacts(searchFilter: string) {
    return getFilterContacts(
      this.isCDCEnabled
        ? this.directoryContacts.cdc
        : this.directoryContacts.all,
      searchFilter,
    );
  }

  // interface of ContactSource
  searchForPhoneNumbers(searchString: string) {
    const { isMultipleSiteEnabled, site } = this._deps.extensionInfo;
    return getSearchForPhoneNumbers({
      contacts: this.isCDCEnabled
        ? this.directoryContacts.cdc
        : this.directoryContacts.all,
      searchString,
      entityType: phoneSources.rcContact,
      options: { isMultipleSiteEnabled, siteCode: site?.code },
    });
  }

  // interface of ContactSource
  matchContactsByPhoneNumber(phoneNumber: string) {
    const { isMultipleSiteEnabled, site } = this._deps.extensionInfo;
    const shouldMatchExtension = isAnExtension(
      phoneNumber,
      this._deps.accountInfo.maxExtensionNumberLength,
    );
    return getMatchContactsByPhoneNumber({
      contacts: [
        ...this.contacts,
        ...this._deps.companyContacts.ivrContacts,
      ] as IContact[],
      phoneNumber,
      entityType: phoneSources.rcContact,
      findPhoneNumber: getFindPhoneNumber({
        phoneNumber,
        shouldMatchExtension,
        options: {
          isMultipleSiteEnabled,
          siteCode: site?.code,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        },
      }),
    });
  }

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
        map(async (accountId): Promise<any> => {
          if (accountExtensionMap[accountId].length > 1) {
            const extensionIds = join(',', accountExtensionMap[accountId]);
            // extract json data now so the data appears in the same format
            // as single requests
            return Promise.all(
              map(
                async (resp) => resp.json(),
                await batchGetApi({
                  platform: this._deps.client.service.platform(),
                  url: `/restapi/v1.0/account/${accountId}/extension/${extensionIds}/presence`,
                }),
              ),
            );
          }
          // wrap single request response data in array to keep the same
          // format as batch requests
          const extensionId = accountExtensionMap[accountId][0];
          return [
            await this._deps.client
              .account(accountId)
              .extension(extensionId)
              .presence()
              .get(),
          ];
        }, keys(accountExtensionMap)),
      );
      // treat all data as batch since the data is normalized
      forEach(
        (batch) =>
          forEach((data) => {
            if ((data as ValidationError).errorCode) {
              console.warn(data);
              return;
            }
            const _data: PresenceInfoResponse = data;
            const { id } = _data.extension!;
            presenceSet[id!] = _data;
          }, batch),
        batchResponses,
      );
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
    }
    return presenceSet;
  }

  // interface of ContactSource
  get sourceName() {
    return 'company';
  }

  // interface of ContactSource
  @computed((that: AccountContacts) => [
    that._deps.companyContacts.filteredContacts,
    that.profileImages,
    that.presences,
    that._deps.accountContactsOptions,
  ])
  get directoryContacts(): DirectoryContacts {
    return reduce(
      (result, item) => {
        if (!isBlank(item.extensionNumber)) {
          const id = `${item.id}`;
          const contact: Contact = {
            ...item,
            type: this.sourceName,
            id,
            name: item.name
              ? item.name
              : `${item.firstName || ''} ${item.lastName || ''}`,
            emails: [item.email!],
            extensionNumber: item.extensionNumber,
            hasProfileImage: !!item.profileImage,
            phoneNumbers: [
              {
                phoneNumber: item.extensionNumber,
                phoneType: phoneTypes.extension,
              },
            ],
            profileImageUrl:
              this.profileImages[id] && this.profileImages[id].imageUrl,
            presence: this.presences[id] && this.presences[id].presence,
            contactStatus: item.status,
          };

          if (item.phoneNumbers && item.phoneNumbers.length > 0) {
            item.phoneNumbers.forEach((phone) => {
              isSupportedPhoneNumber(phone) &&
                contact.phoneNumbers!.push({
                  ...phone,
                  phoneType: convertUsageTypeToPhoneType(phone?.usageType),
                });
            });
          }
          result.all.push(contact);
          if (!contact.hidden) {
            const cdcContact = {
              ...contact,
              phoneNumbers: filter(
                (number) => !number.hidden,
                contact.phoneNumbers ?? [],
              ),
            };
            result.cdc.push(cdcContact);
          }
        }
        return result;
      },
      {
        all: [],
        cdc: [],
      } as DirectoryContacts,
      this._deps.companyContacts.filteredContacts,
    );
  }

  // interface of ContactSource
  get contacts() {
    return this.directoryContacts.all;
  }

  // interface of ContactSource
  @computed((that: AccountContacts) => [
    that._deps.companyContacts.filteredContacts,
  ])
  get rawContacts() {
    return this._deps.companyContacts.filteredContacts;
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
}
