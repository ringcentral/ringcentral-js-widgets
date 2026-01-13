import { sleep } from '@ringcentral-integration/utils';

import moduleStatuses from '../../enums/moduleStatuses';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import Pollable from '../../lib/Pollable';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import { isBlank } from '../../lib/isBlank';
import { proxify } from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import { actionTypes } from './actionTypes';
import getReducer, { getDataReducer, getTimestampReducer } from './getReducer';

const glipGroupRegExp = /glip\/groups$/;

const DEFAULT_PER_PAGE = 20;
const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_RETRY = 62 * 1000;
const DEFAULT_RECORD_COUNT_PER_REQ = 250;
const DEFAULT_PRELOAD_POSTS_DELAY_TTL = 800;

function formatGroup(group: any, personsMap: any, postsMap = {}, ownerId: any) {
  if (!group || !group.id) {
    return {};
  }
  const detailMembers: any = [];
  if (group.members) {
    group.members.forEach((memberId: any) => {
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
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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

function getUniqueMemberIds(groups: any) {
  const memberIds: any = [];
  const memberIdsMap = {};
  groups.forEach((group: any) => {
    group.members.forEach((memberId: any) => {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (memberIdsMap[memberId]) {
        return;
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      memberIdsMap[memberId] = true;
      memberIds.push(memberId);
    });
  });
  return memberIds;
}

function searchPosts(searchFilter: any, posts: any) {
  let result = false;
  for (const post of posts) {
    if (post.text && post.text.toLowerCase().indexOf(searchFilter) > -1) {
      result = true;
      break;
    }
    if (post.mentions && post.mentions.length > 0) {
      const mentionNames = post.mentions
        .map((m: any) => m.name)
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
// @ts-expect-error TS(2415): Class 'GlipGroups' incorrectly extends base class ... Remove this comment to see the full error message
export default class GlipGroups extends Pollable {
  _appFeatures: any;
  _auth: any;
  _client: any;
  _connectivity: any;
  _connectivityMonitor: any;
  _dataStorageKey: any;
  _glipPersons: any;
  _glipPosts: any;
  _perPage: any;
  _polling: any;
  _preloadPosts: any;
  _preloadPostsDelayTtl: any;
  _preloadedPosts: any;
  _promise: any;
  _readyCheckFn: any;
  _recordCountPerReq: any;
  _storage: any;
  _subscription: Subscription;
  _timeToRetry: any;
  _timestampStorageKey: any;
  _ttl: any;
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
  }: any) {
    super({
      ...options,
      actionTypes,
    });
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    this._auth = ensureExist.call(this, auth, 'auth');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    this._client = ensureExist.call(this, client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
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
      this._glipPosts.addNewPostListener((post: any) => this.onNewPost(post));
    }
  }

  override initialize() {
    this.store.subscribe(() => this._onStateChange());

    this._subscription.register(this, {
      filters: [subscriptionFilters.glipGroups],
      handler: (message) => this._handleSubscription(message),
    });
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  override _shouldInit() {
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

  // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  override _shouldReset() {
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

  _onDataReady() {
    if (this._glipPersons) {
      this._glipPersons.loadPersons(this.groupMemberIds);
    }
    if (this._preloadPosts) {
      this._preloadedPosts = {};
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      this._preloadGroupPosts();
    }
  }

  async _handleSubscription(message: any) {
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
      } catch (e: any /** TODO: confirm with instanceof */) {
        console.error('fetchData error:', e);
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
    if (this._connectivityMonitor) {
      this._connectivity = this._connectivityMonitor.connectivity;
    }
  }

  async _preloadGroupPosts(force: any) {
    const groups = this.groups.slice(0, 20);
    for (const group of groups) {
      if (!this._glipPosts) {
        return;
      }
      // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
      if (!this._preloadedPosts[group.id]) {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
        this._preloadedPosts[group.id] = true;
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
        if (!this._glipPosts.postsMap[group.id] || force) {
          await sleep(this._preloadPostsDelayTtl);
          // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
          if (!this._glipPosts.postsMap[group.id] || force) {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
            await this._glipPosts.fetchPosts(group.id);
          }
        }
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
        if (!this._glipPosts.readTimeMap[group.id]) {
          this._glipPosts.updateReadTime(
            // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
            group.id,
            Date.now() - 1000 * 3600 * 2,
          );
        }
      }
    }
  }

  // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<({ searc... Remove this comment to see the full error message
  @proxify
  updateFilter({ searchFilter, pageNumber }: any) {
    this.store.dispatch({
      type: this.actionTypes.updateFilter,
      searchFilter,
      pageNumber,
    });
    if (this._preloadPosts && this.groups.length <= this._perPage * 2) {
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      this._preloadGroupPosts();
    }
  }

  // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<(groupId... Remove this comment to see the full error message
  @proxify
  updateCurrentGroupId(groupId: any) {
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
        // @ts-expect-error TS(2339): Property 'members' does not exist on type '((allGr... Remove this comment to see the full error message
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
    } catch (error: any /** TODO: confirm with instanceof */) {
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
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    return this._promise;
  }

  @proxify
  async startChat(personId: any) {
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
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
    }
    return null;
  }

  onNewPost(post: any) {
    if (post.groupId === this.currentGroupId && this._glipPosts) {
      this._glipPosts.updateReadTime(post.groupId);
    }
  }

  async createTeam(name: any, members: any, type = 'Team') {
    const group = await this._client.glip().groups().post({
      type,
      name,
      members,
      isPublic: true,
      description: '',
    });
    return group.id;
  }

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  allGroups = [
    () => this.data,
    () => this._glipPersons && this._glipPersons.personsMap,
    () => this._glipPosts && this._glipPosts.postsMap,
    () => this._auth.ownerId,
    (data: any, personsMap = {}, postsMap = {}, ownerId: any) =>
      (data || []).map((group: any) =>
        formatGroup(group, personsMap, postsMap, ownerId),
      ),
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  filteredGroups = [
    () => this.allGroups,
    () => this.searchFilter,
    () => this._glipPosts && this._glipPosts.postsMap,
    (allGroups: any, searchFilter: any, postsMap = {}) => {
      if (isBlank(searchFilter)) {
        return allGroups;
      }
      const filterString = searchFilter.toLowerCase();
      return allGroups.filter((group: any) => {
        const name = group.name && group.name.toLowerCase();
        if (name && name.indexOf(filterString) > -1) {
          return true;
        }
        if (!name) {
          const groupUsernames = group.detailMembers
            .map((m: any) => `${m.firstName} ${m.lastName}`)
            .join(' ')
            .toLowerCase();
          if (groupUsernames && groupUsernames.indexOf(filterString) > -1) {
            return true;
          }
        }
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const result = searchPosts(filterString, postsMap[group.id] || []);
        return result;
      });
    },
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  groups = [
    () => this.filteredGroups,
    (filteredGroups: any) => {
      const sortedGroups = filteredGroups.sort((a: any, b: any) => {
        if (a.updatedTime === b.updatedTime) return 0;
        return a.updatedTime > b.updatedTime ? -1 : 1;
      });
      return sortedGroups;
    },
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  uniqueMemberIds = [() => this.allGroups, getUniqueMemberIds];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  groupMemberIds = [
    () => this.allGroups,
    (groups: any) => {
      const noTeamGroups = groups.filter((g: any) => g.type !== 'Team');
      return getUniqueMemberIds(noTeamGroups);
    },
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  currentGroup = [
    () => this.allGroups,
    () => this.currentGroupId,
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    (allGroups: any, currentGroupId: any, personsMap: any) => {
      const group = allGroups.find((g: any) => g.id === currentGroupId) || {};
      return formatGroup(group, personsMap, undefined, this._auth.ownerId);
    },
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  currentGroupPosts = [
    () => {
      const postsMap = (this._glipPosts && this._glipPosts.postsMap) || {};
      return postsMap[this.currentGroupId];
    },
    () => (this._glipPersons && this._glipPersons.personsMap) || {},
    (posts: any, personsMap: any) => {
      // const posts = postsMap[currentGroupId] || [];
      const reversePosts = (posts || []).slice(0).reverse();
      return reversePosts.map((post: any) => {
        const creator = personsMap[post.creatorId];
        return {
          ...post,
          sentByMe: post.creatorId === this._auth.ownerId,
          creator,
        };
      });
    },
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  groupsWithUnread = [
    () => this.groups,
    () => (this._glipPosts && this._glipPosts.postsMap) || {},
    () => (this._glipPosts && this._glipPosts.readTimeMap) || {},
    (groups: any, postsMap: any, readTimeMap: any) =>
      groups.map((group: any) => {
        const posts = postsMap[group.id] || [];
        const readTime = readTimeMap[group.id] || Date.now();
        return {
          ...group,
          unread: posts.filter(
            (post: any) =>
              new Date(post.creationTime).getTime() > readTime &&
              post.creatorId !== this._auth.ownerId,
          ).length,
        };
      }),
  ];

  // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
  @selector
  unreadCounts = [
    () => this.groupsWithUnread,
    (groups: any) => groups.reduce((a: any, b: any) => a + b.unread, 0),
  ];

  get searchFilter() {
    return this.state.searchFilter;
  }

  get data() {
    return this._storage
      ? this._storage.getItem(this._dataStorageKey)
      : this.state.data;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get timestamp() {
    return this._storage
      ? this._storage.getItem(this._timestampStorageKey)
      : this.state.timestamp;
  }

  get currentGroupId() {
    return this.state.currentGroupId;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get status() {
    return this.state.status;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get ready() {
    return this.status === moduleStatuses.ready;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get pending() {
    return this.status === moduleStatuses.pending;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get ttl() {
    return this._ttl;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get timeToRetry() {
    return this._timeToRetry;
  }

  get _hasPermission() {
    return !!this._appFeatures.hasGlipPermission;
  }
}
