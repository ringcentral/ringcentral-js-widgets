import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import ensureExist from '../../lib/ensureExist';
import { addPhoneToContact, getMatchContacts } from '../../lib/contactHelper';
import { batchGetApi } from '../../lib/batchApiHelper';
import proxify from '../../lib/proxy/proxify';

import actionTypes from './actionTypes';
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
    'AccountExtension',
    'AccountPhoneNumber',
    { dep: 'AccoundContactsOptions', optional: true }
  ]
})
export default class AccountContacts extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {AccountExtension} params.accountExtension - accountExtension module instance
   * @param {AccountPhoneNumber} params.accountPhoneNumber - accountPhoneNumber module instance
   * @param {Number} params.ttl - timestamp of local cache, default 30 mins
   * @param {Number} params.avatarTtl - timestamp of avatar local cache, default 2 hour
   * @param {Number} params.presenceTtl - timestamp of presence local cache, default 10 mins
   * @param {Number} params.avatarQueryInterval - interval of query avatar, default 2 seconds
   */
  constructor({
    client,
    accountExtension,
    accountPhoneNumber,
    ttl = DEFAULT_TTL,
    avatarTtl = DEFAULT_AVATARTTL,
    presenceTtl = DEFAULT_PRESENCETTL,
    avatarQueryInterval = DEFAULT_AVATARQUERYINTERVAL,
    ...options,
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._accountExtension = this::ensureExist(accountExtension, 'accountExtension');
    this._accountPhoneNumber = this::ensureExist(accountPhoneNumber, 'accountPhoneNumber');
    this._client = this::ensureExist(client, 'client');

    this._ttl = ttl;
    this._avatarTtl = avatarTtl;
    this._presenceTtl = presenceTtl;
    this._avatarQueryInterval = avatarQueryInterval;

    this._reducer = getReducer(this.actionTypes);

    this.addSelector(
      'contacts',
      () => this._accountExtension.availableExtensions,
      () => this._accountPhoneNumber.extensionToPhoneNumberMap,
      () => this.profileImages,
      () => this.presences,
      (extensions, extensionToPhoneNumberMap, profileImages, presences) => {
        const newExtensions = [];
        extensions.forEach((extension) => {
          if (!(extension.status === 'Enabled' &&
            ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0)) {
            return;
          }
          const id = `${extension.id}`;
          const contact = {
            type: this.sourceName,
            id,
            firstName: extension.contact && extension.contact.firstName,
            lastName: extension.contact && extension.contact.lastName,
            emails: extension.contact ? [extension.contact.email] : [],
            extensionNumber: extension.ext,
            hasProfileImage: !!extension.hasProfileImage,
            phoneNumbers: [{ phoneNumber: extension.ext, phoneType: 'extension' }],
            profileImageUrl: profileImages[id] && profileImages[id].imageUrl,
            presence: presences[id] && presences[id].presence,
          };
          contact.name = `${contact.firstName || ''} ${contact.lastName || ''}`;
          if (isBlank(contact.extensionNumber)) {
            return;
          }
          const phones = extensionToPhoneNumberMap[contact.extensionNumber];
          if (phones && phones.length > 0) {
            phones.forEach((phone) => {
              addPhoneToContact(contact, phone.phoneNumber, 'directPhone');
            });
          }
          newExtensions.push(contact);
        });
        return newExtensions;
      }
    );
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
    return (
      this._accountExtension.ready &&
      this._accountPhoneNumber.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._accountExtension.ready ||
        !this._accountPhoneNumber.ready
      ) &&
      this.ready
    );
  }

  // interface of contact source
  @proxify
  async getProfileImage(contact, useCache = true) {
    if (!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage) {
      return null;
    }

    const imageId = contact.id;
    if (
      useCache &&
      this.profileImages[imageId] &&
      (Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl)
    ) {
      const image = this.profileImages[imageId].imageUrl;
      return image;
    }
    let imageUrl = null;
    try {
      const response = await this._client
        .account()
        .extension(contact.id)
        .profileImage('195x195')
        .get();
      imageUrl = URL.createObjectURL(await response._response.blob());
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

  // interface of contact source
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
        (Date.now() - this.presences[presenceId].timestamp < this._presenceTtl)
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

  // interface of contact source
  matchPhoneNumber(phoneNumber) {
    return getMatchContacts({
      contacts: this.contacts,
      phoneNumber,
      entityType: 'rcContact',
    });
  }

  async _processQueryPresences(getPresenceContexts) {
    const contacts = getPresenceContexts.map(x => x.contact);
    const responses = await this._batchQueryPresences(contacts);
    const presenceMap = {};
    getPresenceContexts.forEach((ctx) => {
      const response = responses[ctx.contact.id];
      if (!response) {
        ctx.resolve(null);
        return;
      }
      const {
        dndStatus, presenceStatus, telephonyStatus, userStatus
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
      if (contacts.length === 1) {
        const { id } = contacts[0];
        const response = await this._client.account().extension(id).presence().get();
        presenceSet[id] = response;
      } else if (contacts.length > 1) {
        const ids = contacts.map(x => x.id).join(',');
        const multipartResponse = await batchGetApi({
          platform: this._client.service.platform(),
          url: `/account/~/extension/${ids}/presence?detailedTelephonyState=true&sipData=true`,
        });
        const responses = multipartResponse.map(x => x.json());
        responses.forEach((item) => {
          presenceSet[item.extension.id] = item;
        });
      }
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

  // interface of contact source
  get sourceName() {
    return 'company';
  }

  // interface of contact source
  get contacts() {
    return this._selectors.contacts();
  }

  get sourceReady() {
    return this.ready;
  }
}
