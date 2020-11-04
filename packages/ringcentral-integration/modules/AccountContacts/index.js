import { reduce, forEach, map, join, keys } from 'ramda';
import { phoneSources } from '../../enums/phoneSources';
import { phoneTypes } from '../../enums/phoneTypes';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import ensureExist from '../../lib/ensureExist';
import { batchGetApi } from '../../lib/batchApiHelper';
import {
  getSearchContacts,
  getMatchContacts,
  getFindContact,
} from '../../lib/contactHelper';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import { actionTypes } from './actionTypes';
import getReducer from './getReducer';

const MaximumBatchGetPresence = 30;
const DEFAULT_TTL = 30 * 60 * 1000; // 30 mins
const DEFAULT_PRESENCETTL = 10 * 60 * 1000; // 10 mins
const DEFAULT_AVATARTTL = 2 * 60 * 60 * 1000; // 2 hour
const DEFAULT_AVATARQUERYINTERVAL = 2 * 1000; // 2 seconds

/**
 * @class
 * @description Contacts managing module
 */
@Module({
  deps: [
    'Client',
    'ExtensionInfo',
    { dep: 'CompanyContacts' },
    { dep: 'AccountContactsOptions', optional: true },
  ],
})
export default class AccountContacts extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {ExtensionInfo} params.extensionInfo - current user extension info
   * @param {CompanyContacts} params.companyContacts - companyContacts module instance
   * @param {Number} params.ttl - timestamp of local cache, default 30 mins
   * @param {Number} params.avatarTtl - timestamp of avatar local cache, default 2 hour
   * @param {Number} params.presenceTtl - timestamp of presence local cache, default 10 mins
   * @param {Number} params.needCheckStatus - If it's necessary to check extension's status
   * @param {Number} params.avatarQueryInterval - interval of query avatar, default 2 seconds
   */
  constructor({
    client,
    companyContacts,
    extensionInfo,
    ttl = DEFAULT_TTL,
    avatarTtl = DEFAULT_AVATARTTL,
    presenceTtl = DEFAULT_PRESENCETTL,
    avatarQueryInterval = DEFAULT_AVATARQUERYINTERVAL,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = ensureExist.call(this, client, 'client');
    this._companyContacts = ensureExist.call(
      this,
      companyContacts,
      'companyContacts',
    );
    this._extensionInfo = extensionInfo;
    this._ttl = ttl;
    this._avatarTtl = avatarTtl;
    this._presenceTtl = presenceTtl;
    this._avatarQueryInterval = avatarQueryInterval;

    this._reducer = getReducer(this.actionTypes);
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return this._companyContacts.ready && this.pending;
  }

  _shouldReset() {
    return !this._companyContacts.ready && this.ready;
  }

  // interface of ContactSource
  @proxify
  async getProfileImage(contact, useCache = true) {
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
      const response = await this._client
        .account(contact.account.id)
        .extension(contact.id)
        .profileImage('195x195')
        .get();
      imageUrl = URL.createObjectURL(await response.blob());
      this.store.dispatch({
        type: this.actionTypes.fetchImageSuccess,
        imageId,
        imageUrl,
        ttl: this._avatarTtl,
      });
    } catch (e) {
      console.error(e);
    }
    return imageUrl;
  }

  // interface of ContactSource
  @proxify
  getPresence(contact, useCache = true) {
    return new Promise((resolve) => {
      if (!contact || !contact.id || contact.type !== 'company') {
        resolve(null);
        return;
      }

      const presenceId = `${contact.id}`;
      if (
        useCache &&
        this.presences[presenceId] &&
        Date.now() - this.presences[presenceId].timestamp < this._presenceTtl
      ) {
        const { presence } = this.presences[presenceId];
        resolve(presence);
        return;
      }

      if (!this._getPresenceContexts) {
        this._getPresenceContexts = [];
      }
      this._getPresenceContexts.push({
        contact,
        resolve,
      });

      clearTimeout(this.enqueueTimeoutId);
      if (this._getPresenceContexts.length === MaximumBatchGetPresence) {
        this._processQueryPresences(this._getPresenceContexts);
        this._getPresenceContexts = null;
      } else {
        this.enqueueTimeoutId = setTimeout(() => {
          this._processQueryPresences(this._getPresenceContexts);
          this._getPresenceContexts = null;
        }, 1000);
      }
    });
  }

  // interface of ContactSource
  searchContacts(searchString) {
    const { isMultipleSiteEnabled, site } = this._extensionInfo;
    return getSearchContacts({
      contacts: this.contacts,
      searchString,
      entityType: phoneSources.contact,
      options: { isMultipleSiteEnabled, siteCode: site?.code },
    });
  }

  // interface of ContactSource
  matchPhoneNumber(phoneNumber) {
    const { isMultipleSiteEnabled, site } = this._extensionInfo;
    return getMatchContacts({
      contacts: this.contacts.concat(this._companyContacts.ivrContacts),
      phoneNumber,
      entityType: phoneSources.rcContact,
      findContact: getFindContact({
        phoneNumber,
        options: {
          isMultipleSiteEnabled,
          siteCode: site?.code,
        },
      }),
    });
  }

  async _processQueryPresences(getPresenceContexts) {
    const contacts = getPresenceContexts.map((x) => x.contact);
    const responses = await this._batchQueryPresences(contacts);
    const presenceMap = {};
    getPresenceContexts.forEach((ctx) => {
      const response = responses[ctx.contact.id];
      if (!response) {
        ctx.resolve(null);
        return;
      }
      const {
        dndStatus,
        presenceStatus,
        telephonyStatus,
        userStatus,
      } = response;
      const presenceId = ctx.contact.id;
      presenceMap[presenceId] = {
        dndStatus,
        presenceStatus,
        telephonyStatus,
        userStatus,
      };
      ctx.resolve(presenceMap[presenceId]);
    });
    this.store.dispatch({
      type: this.actionTypes.batchFetchPresenceSuccess,
      presenceMap,
      ttl: this._presenceTtl,
    });
  }

  async _batchQueryPresences(contacts) {
    const presenceSet = {};
    try {
      const accountExtensionMap = reduce(
        (acc, item) => {
          if (!acc[item.account.id]) {
            acc[item.account.id] = [];
          }
          acc[item.account.id].push(item.id);
          return acc;
        },
        {},
        contacts,
      );
      const batchResponses = await Promise.all(
        map(async (accountId) => {
          if (accountExtensionMap[accountId].length > 1) {
            const ids = join(',', accountExtensionMap[accountId]);
            // extract json data now so the data appears in the same format
            // as single requests
            return Promise.all(
              map(
                async (resp) => resp.json(),
                await batchGetApi({
                  platform: this._client.service.platform(),
                  url: `/restapi/v1.0/account/${accountId}/extension/${ids}/presence`,
                }),
              ),
            );
          }
          // wrap single request response data in array to keep the same
          // format as batch requests
          return [
            await this._client
              .account(accountId)
              .extension(accountExtensionMap[accountId][0])
              .presence()
              .get(),
          ];
        }, keys(accountExtensionMap)),
      );
      // treat all data as batch since the data is normalized
      forEach(
        (batch) =>
          forEach((data) => {
            if (data.errorCode) {
              console.warn(data);
              return;
            }
            presenceSet[data.extension.id] = data;
          }, batch),
        batchResponses,
      );
    } catch (e) {
      console.error(e);
    }
    return presenceSet;
  }

  get status() {
    return this.state.status;
  }

  get profileImages() {
    return this.state.profileImages;
  }

  get presences() {
    return this.state.presences;
  }

  // interface of ContactSource
  get sourceName() {
    return 'company';
  }

  // interface of ContactSource
  @selector
  directoryContacts = [
    () => this._companyContacts.filteredContacts,
    () => this.profileImages,
    () => this.presences,
    (contacts, profileImages, presences) =>
      reduce(
        (result, item) => {
          const id = `${item.id}`;
          const contact = {
            ...item,
            type: this.sourceName,
            id,
            emails: [item.email],
            extensionNumber: item.extensionNumber,
            hasProfileImage: !!item.profileImage,
            phoneNumbers: [
              {
                phoneNumber: item.extensionNumber,
                phoneType: phoneTypes.extension,
              },
            ],
            profileImageUrl: profileImages[id] && profileImages[id].imageUrl,
            presence: presences[id] && presences[id].presence,
            contactStatus: item.status,
          };
          contact.name = item.name
            ? item.name
            : `${contact.firstName || ''} ${contact.lastName || ''}`;
          if (isBlank(contact.extensionNumber)) {
            return result;
          }
          if (item.phoneNumbers && item.phoneNumbers.length > 0) {
            item.phoneNumbers.forEach((phone) => {
              if (phone.type) {
                contact.phoneNumbers.push({
                  ...phone,
                  phoneType: phoneTypes.direct,
                });
              }
            });
          }
          result.push(contact);
          return result;
        },
        [],
        contacts,
      ),
  ];

  // interface of ContactSource
  get contacts() {
    return this.directoryContacts;
  }

  // interface of ContactSource
  get sourceReady() {
    return this.ready;
  }
}
