import { createSelector } from 'reselect';

import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import isBlank from '../../lib/isBlank';
import sleep from '../../lib/sleep';
import moduleStatuses from '../../enums/moduleStatuses';
import ensureExist from '../../lib/ensureExist';
import getter from '../../lib/getter';
import proxify from '../../lib/proxy/proxify';

import getReducer, {
  getDataReducer,
  getCurrentGroupIdReducer,
  getTimestampReducer,
} from './getReducer';
import actionTypes from './actionTypes';

const glipGroupRegExp = /glip\/groups$/;
const subscriptionFilter = '/glip/groups';

const DEFAULT_PER_PAGE = 20;
const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_RETRY = 62 * 1000;

function formatGroup(group, personsMap, postsMap = {}, ownerId) {
  if (!group || !group.id) {
    return {};
  }
  const detailMembers = [];
  if (group.members) {
    group.members.forEach((memberId) => {
      if (personsMap[memberId]) {
        detailMembers.push({
          ...personsMap[memberId],
          isMe: ownerId === memberId,
        });
      }
    });
  }
  const newGroup = {
    ...group,
    detailMembers,
    updatedTime: (new Date(group.lastModifiedTime)).getTime(),
  };
  const latestPost =
    postsMap[group.id] && postsMap[group.id][0];
  if (latestPost) {
    newGroup.latestPost = {
      ...latestPost,
      creator: personsMap[latestPost.creatorId],
    };
    const postCreationTime = (new Date(latestPost.creationTime)).getTime();
    if (postCreationTime > newGroup.updatedTime) {
      newGroup.updatedTime = postCreationTime;
    }
  }
  return newGroup;
}

/**
 * @class
 * @description Accound info managing module.
 */
@Module({
  deps: [
    'Auth',
    'Client',
    'Subscription',
    { dep: 'Storage', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'GlipPersons', optional: true },
    { dep: 'GlipPosts', optional: true },
    { dep: 'GLipGroupsOptions', optional: true }
  ]
})
export default class GlipGroups extends Pollable {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {GlipPersons} params.glipPersons - glipPersons module instance
   * @param {GlipPosts} params.glipPosts - glipPosts module instance
   * @param {Storage} params.storage - storage module instance
   */
  constructor({
    auth,
    subscription,
    client,
    tabManager,
    glipPersons,
    glipPosts,
    storage,
    timeToRetry = DEFAULT_RETRY,
    ttl = DEFAULT_TTL,
    polling = false,
    disableCache = false,
    perPage = DEFAULT_PER_PAGE,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = this::ensureExist(auth, 'auth');
    this._client = this::ensureExist(client, 'client');
    this._subscription = this::ensureExist(subscription, 'subscription');
    this._glipPersons = glipPersons;
    this._glipPosts = glipPosts;
    this._tabManager = tabManager;

    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._polling = polling;
    this._perPage = perPage;

    this._promise = null;
    this._lastMessage = null;

    this._subscriptionFilters = [subscriptionFilter];
    if (!disableCache) {
      this._storage = storage;
    }

    this._dataStorageKey = 'glipGroupsData';
    this._timestampStorageKey = 'glipGroupsTimestamp';
    this._currentGroupIdStorageKey = 'glipGroupsCurrentGroupId';

    if (this._storage) {
      this._reducer = getReducer(this.actionTypes);

      this._storage.registerReducer({
        key: this._dataStorageKey,
        reducer: getDataReducer(this.actionTypes),
      });
      this._storage.registerReducer({
        key: this._timestampStorageKey,
        reducer: getTimestampReducer(this.actionTypes),
      });
      this._storage.registerReducer({
        key: this._currentGroupIdStorageKey,
        reducer: getCurrentGroupIdReducer(this.actionTypes),
      });
    } else {
      this._reducer = getReducer(this.actionTypes, {
        timestamp: getTimestampReducer(this.actionTypes),
        data: getDataReducer(this.actionTypes),
        currentGroupId: getCurrentGroupIdReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      await this._init();
    } else if (this._isDataReady()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      if (this._glipPersons) {
        this._glipPersons.loadPersons(this.uniqueMemberIds);
      }
      if (this.currentGroupId && !this.currentGroup.id) {
        this.updateCurrentGroupId(this.groups[0] && this.groups[0].id);
      }
      this._preloadGroupPosts();
    } else if (this._shouldReset()) {
      this._clearTimeout();
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (this._shouldSubscribe()) {
      this._processSubscription();
    }
  }

  _shouldInit() {
    return !!(
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      (!this._readyCheckFn || this._readyCheckFn()) &&
      (!this._subscription || this._subscription.ready) &&
      (!this._glipPosts || this._glipPosts.ready) &&
      (!this._glipPersons || this._glipPersons.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return !!(
      (
        !this._auth.loggedIn ||
        (this._storage && !this._storage.ready) ||
        (this._readyCheckFn && !this._readyCheckFn()) ||
        (this._subscription && !this._subscription.ready) ||
        (this._glipPosts && !this._glipPosts.ready) ||
        (this._glipPersons && !this._glipPersons.ready) ||
        (this._tabManager && !this._tabManager.ready)
      ) &&
      this.ready
    );
  }

  _shouldSubscribe() {
    return !!(
      this.ready &&
      this._subscription &&
      this._subscription.ready &&
      this._subscription.message &&
      this._subscription.message !== this._lastMessage
    );
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      glipGroupRegExp.test(message.event) &&
      message.body
    ) {
      const {
        eventType,
        ...group
      } = message.body;
      if (eventType === 'GroupLeft') {
        this.store.dispatch({
          type: this.actionTypes.removeGroup,
          group,
        });
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.updateGroup,
        group,
      });
      if (this._glipPersons) {
        this._glipPersons.loadPersons(group.members);
      }
      this._glipPosts.loadPosts(group.id);
    }
  }

  _shouldFetch() {
    return (
      !this._tabManager || this._tabManager.active
    );
  }

  _isDataReady() {
    return this.status === moduleStatuses.initializing &&
      this.timestamp !== null;
  }

  async _init() {
    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e) {
        console.error('fetchData error:', e);
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
    if (this._subscription && this._subscriptionFilters) {
      this._subscription.subscribe(this._subscriptionFilters);
    }
  }

  _processSubscription() {
    this._lastMessage = this._subscription.message;
    this._subscriptionHandleFn(this._lastMessage);
  }

  async _preloadGroupPosts() {
    for (const group of this.groups) {
      if (this._glipPosts) {
        await sleep(200);
        await this._glipPosts.loadPosts(group.id);
      }
    }
  }

  @proxify
  updateFilter({ searchFilter, pageNumber }) {
    this.store.dispatch({
      type: this.actionTypes.updateFilter,
      searchFilter,
      pageNumber,
    });
  }

  @proxify
  updateCurrentGroupId(groupId) {
    if (!groupId) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.updateCurrentGroupId,
      groupId,
    });
    this._glipPosts.loadPosts(groupId);
    if (this._glipPersons) {
      this._glipPersons.loadPersons(
        this.currentGroup && this.currentGroup.members
      );
    }
  }

  async _fetchFunction() {
    const result = await this._client.glip().groups().list();
    return result;
  }

  async _fetchData() {
    this.store.dispatch({
      type: this.actionTypes.fetch,
    });
    const { ownerId } = this._auth;
    try {
      const data = await this._fetchFunction();
      if (this._auth.ownerId === ownerId) {
        this.store.dispatch({
          type: this.actionTypes.fetchSuccess,
          data,
          timestamp: Date.now(),
        });
        if (this._polling) {
          this._startPolling();
        }
        this._promise = null;
      }
    } catch (error) {
      if (this._auth.ownerId === ownerId) {
        this._promise = null;
        this.store.dispatch({
          type: this.actionTypes.fetchError,
          error,
        });
        if (this._polling) {
          this._startPolling(this.timeToRetry);
        } else {
          this._retry();
        }
        throw error;
      }
    }
  }

  @proxify
  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    return this._promise;
  }

  @proxify
  async startChat(personId) {
    try {
      const group = await this._client.glip().groups().post({
        type: 'PrivateChat',
        members: [this._auth.ownerId, personId]
      });
      group.lastModifiedTime = Date.now();
      this.store.dispatch({
        type: this.actionTypes.updateGroup,
        group,
      });
      this.store.dispatch({
        type: this.actionTypes.updateCurrentGroupId,
        groupId: group.id,
      });
      return group;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  @getter
  allGroups = createSelector(
    () => this.data,
    data => (data || []),
  )

  @getter
  filteredGroups = createSelector(
    () => this.allGroups,
    () => this.searchFilter,
    (allGroups, searchFilter) => {
      if (isBlank(searchFilter)) {
        return allGroups;
      }
      const filterString = searchFilter.toLowerCase();
      return allGroups.filter((group) => {
        const name = group.name && group.name.toLowerCase();
        if (name && name.indexOf(filterString) > -1) {
          return true;
        }
        return false;
      });
    },
  )

  @getter
  groups = createSelector(
    () => this.filteredGroups,
    () => this.pageNumber,
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    () => (this._glipPosts && this._glipPosts.postsMap) || {},
    (filteredGroups, pageNumber, personsMap, postsMap) => {
      const count = pageNumber * this._perPage;
      const sortedGroups =
        filteredGroups.map(group => formatGroup(group, personsMap, postsMap, this._auth.ownerId))
          .sort((a, b) => {
            if (a.updatedTime === b.updatedTime) return 0;
            return a.updatedTime > b.updatedTime ?
              -1 :
              1;
          });
      return sortedGroups.slice(0, count);
    },
  )

  @getter
  uniqueMemberIds = createSelector(
    () => this.allGroups,
    (groups) => {
      const memberIds = [];
      const memberIdsMap = {};
      groups.forEach((group) => {
        group.members.forEach((memberId) => {
          if (memberIdsMap[memberId]) {
            return;
          }
          memberIdsMap[memberId] = true;
          memberIds.push(memberId);
        });
      });
      return memberIds;
    },
  )

  @getter
  currentGroup = createSelector(
    () => this.allGroups,
    () => this.currentGroupId,
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    (allGroups, currentGroupId, personsMap) => {
      const group = allGroups.find(g => g.id === currentGroupId) || {};
      return formatGroup(group, personsMap, undefined, this._auth.ownerId);
    },
  )

  @getter
  currentGroupPosts = createSelector(
    () => (this._glipPosts && this._glipPosts.postsMap) || {},
    () => this.currentGroupId,
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    (postsMap, currentGroupId, personsMap) => {
      const posts = postsMap[currentGroupId] || [];
      const reversePosts = posts.slice(0).reverse();
      return reversePosts.map((post) => {
        const creator = personsMap[post.creatorId];
        return {
          ...post,
          creator,
        };
      });
    },
  )

  get searchFilter() {
    return this.state.searchFilter;
  }

  get pageNumber() {
    return this.state.pageNumber;
  }

  get data() {
    return this._storage ?
      this._storage.getItem(this._dataStorageKey) :
      this.state.data;
  }

  get timestamp() {
    return this._storage ?
      this._storage.getItem(this._timestampStorageKey) :
      this.state.timestamp;
  }

  get currentGroupId() {
    return this._storage ?
      this._storage.getItem(this._currentGroupIdStorageKey) :
      this.state.currentGroupId;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }

  get ttl() {
    return this._ttl;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }
}
