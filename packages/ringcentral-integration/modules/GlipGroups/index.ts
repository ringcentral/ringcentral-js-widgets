import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import isBlank from '../../lib/isBlank';
import Pollable from '../../lib/Pollable';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import sleep from '../../lib/sleep';
import { actionTypes } from './actionTypes';
import getReducer, { getDataReducer, getTimestampReducer } from './getReducer';

const glipGroupRegExp = /glip\/groups$/;
const subscriptionFilter = '/restapi/v1.0/glip/groups';

const DEFAULT_PER_PAGE = 20;
const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_RETRY = 62 * 1000;
const DEFAULT_RECORD_COUNT_PER_REQ = 250;
const DEFAULT_PRELOAD_POSTS_DELAY_TTL = 800;

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
    updatedTime: new Date(group.lastModifiedTime).getTime(),
  };
  const latestPost = postsMap[group.id] && postsMap[group.id][0];
  if (latestPost) {
    newGroup.latestPost = {
      ...latestPost,
      creator: personsMap[latestPost.creatorId],
    };
    const postCreationTime = new Date(latestPost.creationTime).getTime();
    if (postCreationTime > newGroup.updatedTime) {
      newGroup.updatedTime = postCreationTime;
    }
  }
  return newGroup;
}

function getUniqueMemberIds(groups) {
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
}

function searchPosts(searchFilter, posts) {
  let result = false;
  for (const post of posts) {
    if (post.text && post.text.toLowerCase().indexOf(searchFilter) > -1) {
      result = true;
      break;
    }
    if (post.mentions && post.mentions.length > 0) {
      const mentionNames = post.mentions
        .map((m) => m.name)
        .join(' ')
        .toLowerCase();
      if (mentionNames.indexOf(searchFilter) > -1) {
        result = true;
        break;
      }
    }
  }
  return result;
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
    'AppFeatures',
    { dep: 'ConnectivityMonitor', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'GlipPersons', optional: true },
    { dep: 'GlipPosts', optional: true },
    { dep: 'GLipGroupsOptions', optional: true },
  ],
})
export default class GlipGroups extends Pollable {
  constructor({
    auth,
    subscription,
    client,
    tabManager,
    glipPersons,
    glipPosts,
    storage,
    appFeatures,
    connectivityMonitor,
    timeToRetry = DEFAULT_RETRY,
    ttl = DEFAULT_TTL,
    polling = false,
    disableCache = false,
    perPage = DEFAULT_PER_PAGE,
    recordCountPerReq = DEFAULT_RECORD_COUNT_PER_REQ,
    preloadPosts = true,
    preloadPostsDelayTtl = DEFAULT_PRELOAD_POSTS_DELAY_TTL,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = ensureExist.call(this, auth, 'auth');
    this._client = ensureExist.call(this, client, 'client');
    this._subscription = ensureExist.call(this, subscription, 'subscription');
    this._appFeatures = appFeatures;
    this._connectivityMonitor = connectivityMonitor;
    this._glipPersons = glipPersons;
    this._glipPosts = glipPosts;
    this._tabManager = tabManager;

    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._polling = polling;
    this._perPage = perPage;
    this._recordCountPerReq = recordCountPerReq;
    this._preloadPosts = preloadPosts;
    this._preloadedPosts = {};
    this._preloadPostsDelayTtl = preloadPostsDelayTtl;

    this._promise = null;
    this._lastMessage = null;

    this._subscriptionFilters = [subscriptionFilter];
    if (!disableCache) {
      this._storage = storage;
    }

    this._dataStorageKey = 'glipGroupsData';
    this._timestampStorageKey = 'glipGroupsTimestamp';

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
    } else {
      this._reducer = getReducer(this.actionTypes, {
        timestamp: getTimestampReducer(this.actionTypes),
        data: getDataReducer(this.actionTypes),
      });
    }

    if (this._glipPosts) {
      this._glipPosts.addNewPostListener((post) => this.onNewPost(post));
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
      this._onDataReady();
    } else if (this._shouldReset()) {
      this._clearTimeout();
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (this._shouldHandleSubscriptionMessage()) {
      this._processSubscription();
    } else if (
      this.ready &&
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      if (!this._connectivity) {
        return;
      }
      await this.fetchData();
      if (this._preloadPosts) {
        this._preloadedPosts = {};
        this._preloadGroupPosts(true);
      }
    }
  }

  _shouldInit() {
    return !!(
      this._auth.loggedIn &&
      this._appFeatures.ready &&
      (!this._connectivityMonitor || this._connectivityMonitor.ready) &&
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
      (!this._auth.loggedIn ||
        !this._appFeatures.ready ||
        (this._storage && !this._storage.ready) ||
        (this._readyCheckFn && !this._readyCheckFn()) ||
        (this._subscription && !this._subscription.ready) ||
        (this._glipPosts && !this._glipPosts.ready) ||
        (this._glipPersons && !this._glipPersons.ready) ||
        (this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        (this._tabManager && !this._tabManager.ready)) &&
      this.ready
    );
  }

  _shouldHandleSubscriptionMessage() {
    return !!(
      this.ready &&
      this._subscription &&
      this._subscription.ready &&
      this._subscription.message &&
      this._subscription.message !== this._lastMessage
    );
  }

  _onDataReady() {
    if (this._glipPersons) {
      this._glipPersons.loadPersons(this.groupMemberIds);
    }
    if (this._preloadPosts) {
      this._preloadedPosts = {};
      this._preloadGroupPosts();
    }
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      glipGroupRegExp.test(message.event) &&
      message.body &&
      message.body.eventType
    ) {
      const { eventType, ...group } = message.body;
      if (eventType.indexOf('Group') !== 0) {
        return;
      }
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
    return !this._tabManager || this._tabManager.active;
  }

  _isDataReady() {
    return (
      this.status === moduleStatuses.initializing && this.timestamp !== null
    );
  }

  async _init() {
    if (!this._hasPermission) {
      return;
    }
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
    if (this._connectivityMonitor) {
      this._connectivity = this._connectivityMonitor.connectivity;
    }
  }

  _processSubscription() {
    this._lastMessage = this._subscription.message;
    this._subscriptionHandleFn(this._lastMessage);
  }

  async _preloadGroupPosts(force) {
    const groups = this.groups.slice(0, 20);
    for (const group of groups) {
      if (!this._glipPosts) {
        return;
      }
      if (!this._preloadedPosts[group.id]) {
        this._preloadedPosts[group.id] = true;
        if (!this._glipPosts.postsMap[group.id] || force) {
          await sleep(this._preloadPostsDelayTtl);
          if (!this._glipPosts.postsMap[group.id] || force) {
            await this._glipPosts.fetchPosts(group.id);
          }
        }
        if (!this._glipPosts.readTimeMap[group.id]) {
          this._glipPosts.updateReadTime(
            group.id,
            Date.now() - 1000 * 3600 * 2,
          );
        }
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
    if (this._preloadPosts && this.groups.length <= this._perPage * 2) {
      this._preloadGroupPosts();
    }
  }

  @proxify
  updateCurrentGroupId(groupId) {
    if (!groupId) {
      return;
    }
    const lastGroupId = this.currentGroupId;
    const lastGroupPosts = this.currentGroupPosts;
    this.store.dispatch({
      type: this.actionTypes.updateCurrentGroupId,
      groupId,
    });
    if (this._glipPersons) {
      this._glipPersons.loadPersons(
        this.currentGroup && this.currentGroup.members,
      );
    }
    if (!this._glipPosts) {
      return;
    }
    if (lastGroupPosts.length > 20) {
      this._glipPosts.fetchPosts(lastGroupId);
    }
    this._glipPosts.loadPosts(groupId);
    this._glipPosts.updateReadTime(groupId);
  }

  async _fetchFunction() {
    const result = await this._client.glip().groups().list({
      recordCount: this._recordCountPerReq,
    });
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
      const group = await this._client
        .glip()
        .groups()
        .post({
          type: 'PrivateChat',
          members: [this._auth.ownerId, personId],
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

  onNewPost(post) {
    if (post.groupId === this.currentGroupId && this._glipPosts) {
      this._glipPosts.updateReadTime(post.groupId);
    }
  }

  async createTeam(name, members, type = 'Team') {
    const group = await this._client.glip().groups().post({
      type,
      name,
      members,
      isPublic: true,
      description: '',
    });
    return group.id;
  }

  @selector
  allGroups = [
    () => this.data,
    () => this._glipPersons && this._glipPersons.personsMap,
    () => this._glipPosts && this._glipPosts.postsMap,
    () => this._auth.ownerId,
    (data, personsMap = {}, postsMap = {}, ownerId) =>
      (data || []).map((group) =>
        formatGroup(group, personsMap, postsMap, ownerId),
      ),
  ];

  @selector
  filteredGroups = [
    () => this.allGroups,
    () => this.searchFilter,
    () => this._glipPosts && this._glipPosts.postsMap,
    (allGroups, searchFilter, postsMap = {}) => {
      if (isBlank(searchFilter)) {
        return allGroups;
      }
      const filterString = searchFilter.toLowerCase();
      return allGroups.filter((group) => {
        const name = group.name && group.name.toLowerCase();
        if (name && name.indexOf(filterString) > -1) {
          return true;
        }
        if (!name) {
          const groupUsernames = group.detailMembers
            .map((m) => `${m.firstName} ${m.lastName}`)
            .join(' ')
            .toLowerCase();
          if (groupUsernames && groupUsernames.indexOf(filterString) > -1) {
            return true;
          }
        }
        const result = searchPosts(filterString, postsMap[group.id] || []);
        return result;
      });
    },
  ];

  @selector
  groups = [
    () => this.filteredGroups,
    (filteredGroups) => {
      const sortedGroups = filteredGroups.sort((a, b) => {
        if (a.updatedTime === b.updatedTime) return 0;
        return a.updatedTime > b.updatedTime ? -1 : 1;
      });
      return sortedGroups;
    },
  ];

  @selector
  uniqueMemberIds = [() => this.allGroups, getUniqueMemberIds];

  @selector
  groupMemberIds = [
    () => this.allGroups,
    (groups) => {
      const noTeamGroups = groups.filter((g) => g.type !== 'Team');
      return getUniqueMemberIds(noTeamGroups);
    },
  ];

  @selector
  currentGroup = [
    () => this.allGroups,
    () => this.currentGroupId,
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    (allGroups, currentGroupId, personsMap) => {
      const group = allGroups.find((g) => g.id === currentGroupId) || {};
      return formatGroup(group, personsMap, undefined, this._auth.ownerId);
    },
  ];

  @selector
  currentGroupPosts = [
    () => {
      const postsMap = (this._glipPosts && this._glipPosts.postsMap) || {};
      return postsMap[this.currentGroupId];
    },
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    (posts, personsMap) => {
      // const posts = postsMap[currentGroupId] || [];
      const reversePosts = (posts || []).slice(0).reverse();
      return reversePosts.map((post) => {
        const creator = personsMap[post.creatorId];
        return {
          ...post,
          sentByMe: post.creatorId === this._auth.ownerId,
          creator,
        };
      });
    },
  ];

  @selector
  groupsWithUnread = [
    () => this.groups,
    () => (this._glipPosts && this._glipPosts.postsMap) || {},
    () => (this._glipPosts && this._glipPosts.readTimeMap) || {},
    (groups, postsMap, readTimeMap) =>
      groups.map((group) => {
        const posts = postsMap[group.id] || [];
        const readTime = readTimeMap[group.id] || Date.now();
        return {
          ...group,
          unread: posts.filter(
            (post) =>
              new Date(post.creationTime).getTime() > readTime &&
              post.creatorId !== this._auth.ownerId,
          ).length,
        };
      }),
  ];

  @selector
  unreadCounts = [
    () => this.groupsWithUnread,
    (groups) => groups.reduce((a, b) => a + b.unread, 0),
  ];

  get searchFilter() {
    return this.state.searchFilter;
  }

  get data() {
    return this._storage
      ? this._storage.getItem(this._dataStorageKey)
      : this.state.data;
  }

  get timestamp() {
    return this._storage
      ? this._storage.getItem(this._timestampStorageKey)
      : this.state.timestamp;
  }

  get currentGroupId() {
    return this.state.currentGroupId;
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

  get _hasPermission() {
    return !!this._appFeatures.hasGlipPermission;
  }
}
