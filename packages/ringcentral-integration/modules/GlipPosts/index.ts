import moduleStatuses from '../../enums/moduleStatuses';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import { isBlank } from '../../lib/isBlank';
import { proxify } from '../../lib/proxy/proxify';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import { actionTypes } from './actionTypes';
import getReducer, { getGlipPostsReadTimeReducer } from './getReducer';
import { status } from './status';

const glipPostsRegExp = /glip\/posts$/;
const glipGroupRegExp = /glip\/groups$/;

const DEFAULT_LOAD_TTL = 30 * 60 * 1000;

@Module({
  deps: [
    'Client',
    'Auth',
    'Subscription',
    'Storage',
    'ExtensionFeatures',
    { dep: 'GlipPostsOptions', optional: true },
  ],
})
// @ts-expect-error TS(2415): Class 'GlipPosts' incorrectly extends base class '... Remove this comment to see the full error message
export default class GlipPosts extends RcModule {
  _auth: any;
  _client: any;
  _extensionFeatures: any;
  _fetchPromises: any;
  _loadTtl: any;
  _newPostListeners: any;
  _readTimeStorageKey: any;
  _storage: any;
  _subscription: Subscription;
  constructor({
    client,
    auth,
    subscription,
    storage,
    extensionFeatures,
    loadTtl = DEFAULT_LOAD_TTL,
    ...options
  }: any) {
    super({
      ...options,
      actionTypes,
    });
    this._reducer = getReducer(this.actionTypes);

    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    this._client = ensureExist.call(this, client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    this._auth = ensureExist.call(this, auth, 'auth');
    this._extensionFeatures = extensionFeatures;
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    this._subscription = ensureExist.call(this, subscription, 'subscription');
    this._fetchPromises = {};
    this._loadTtl = loadTtl;

    this._storage = storage;
    this._readTimeStorageKey = 'glipPostReadTime';
    this._storage.registerReducer({
      key: this._readTimeStorageKey,
      reducer: getGlipPostsReadTimeReducer(this.actionTypes),
    });
    this._newPostListeners = [];
  }

  addNewPostListener(listen: any) {
    if (typeof listen === 'function') {
      this._newPostListeners.push(listen);
    }
  }

  override initialize() {
    this.store.subscribe(() => this._onStateChange());

    this._subscription.register(this, {
      filters: [subscriptionFilters.glipPosts],
      handler: (message) => this._handleSubscription(message),
    });
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (!this._hasPermission) return;
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
      this._fetchPromises = {};
    }
  }

  // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  override _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._subscription.ready &&
      this._extensionFeatures.ready &&
      this.pending
    );
  }

  // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  override _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._extensionFeatures.ready ||
        !this._subscription.ready) &&
      this.ready
    );
  }

  _handleSubscription(message: any) {
    if (
      message &&
      (glipPostsRegExp.test(message.event) ||
        glipGroupRegExp.test(message.event)) &&
      message.body
    ) {
      const { eventType, ...post } = message.body;
      if (eventType.indexOf('Post') !== 0) {
        return;
      }
      if (eventType === 'PostRemoved') {
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.createSuccess,
        groupId: post.groupId,
        record: post,
        oldRecordId: post.id,
        isSendByMe:
          post.creatorId === this._auth.ownerId && eventType === 'PostAdded',
      });
      if (eventType === 'PostAdded' && post.creatorId !== this._auth.ownerId) {
        this._newPostListeners.forEach((listen: any) => {
          listen(post);
        });
      }
    }
  }

  @proxify
  async loadPosts(groupId: any, recordCount = 20) {
    const lastPosts = this.postsMap[groupId];
    const fetchTime = this.fetchTimeMap[groupId];
    if (lastPosts && fetchTime && Date.now() - fetchTime < this._loadTtl) {
      return;
    }
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
    await this.fetchPosts(groupId, recordCount);
  }

  @proxify
  async fetchPosts(groupId: any, recordCount = 20, pageToken: any) {
    if (!groupId) {
      return;
    }
    if (!this._fetchPromises[groupId]) {
      this._fetchPromises[groupId] = (async () => {
        try {
          this.store.dispatch({
            type: this.actionTypes.fetch,
          });
          const params = { recordCount };
          if (pageToken) {
            // @ts-expect-error TS(2339): Property 'pageToken' does not exist on type '{ rec... Remove this comment to see the full error message
            params.pageToken = pageToken;
          }
          const response = await this._client
            .glip()
            .groups(groupId)
            .posts()
            .list(params);
          this.store.dispatch({
            type: this.actionTypes.fetchSuccess,
            groupId,
            records: response.records,
            lastPageToken: pageToken,
            navigation: response.navigation,
          });
        } catch (e: any /** TODO: confirm with instanceof */) {
          this.store.dispatch({
            type: this.actionTypes.fetchError,
          });
        }
        this._fetchPromises[groupId] = null;
      })();
    }
    const promise = this._fetchPromises[groupId];
    await promise;
  }

  @proxify
  async loadNextPage(groupId: any, recordCount: any) {
    const pageInfo = this.pageInfos[groupId];
    const pageToken = pageInfo && pageInfo.prevPageToken;
    if (!pageToken) {
      return;
    }
    await this.fetchPosts(groupId, recordCount, pageToken);
  }

  @proxify
  async create({ groupId }: any) {
    let text = this.postInputs[groupId] && this.postInputs[groupId].text;
    const mentions =
      this.postInputs[groupId] && this.postInputs[groupId].mentions;
    if (isBlank(text) || !groupId) {
      return;
    }
    if (mentions && mentions.length > 0) {
      mentions.forEach((mention: any) => {
        if (!mention.matcherId) {
          return;
        }
        text = text.replace(
          mention.mention,
          `![:Person](${mention.matcherId})`,
        );
      });
    }
    const fakeId = `${Date.now()}`;
    const fakeRecord = {
      id: fakeId,
      groupId,
      creatorId: this._auth.ownerId,
      sendStatus: status.creating,
      creationTime: `${new Date(Date.now())}`,
      text,
      type: 'TextMessage',
    };
    try {
      this.store.dispatch({
        type: this.actionTypes.create,
        groupId,
        record: fakeRecord,
      });
      this.updatePostInput({ text: '', groupId, mentions: [] });
      const record = await this._client.glip().groups(groupId).posts().post({
        text,
      });
      this.store.dispatch({
        type: this.actionTypes.createSuccess,
        groupId,
        record,
        oldRecordId: fakeId,
      });
    } catch (e: any /** TODO: confirm with instanceof */) {
      // @ts-expect-error TS(2339): Property 'createError' does not exist on type 'Obj... Remove this comment to see the full error message
      fakeRecord.sendStatus = status.createError;
      this.store.dispatch({
        type: this.actionTypes.createError,
        record: fakeRecord,
        groupId,
        oldRecordId: fakeId,
      });
      this.updatePostInput({ text, groupId, mentions });
    }
  }

  @proxify
  async sendFile({ fileName, groupId, rawFile }: any) {
    try {
      const platform = this._client.service.platform();
      const body = rawFile;
      const response = await platform.post(
        '/restapi/v1.0/glip/files',
        body,
        { groupId, name: fileName },
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        },
      );
      return response.json();
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
    }
    return null;
  }

  // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<(groupId... Remove this comment to see the full error message
  @proxify
  updateReadTime(groupId: any, time: any) {
    this.store.dispatch({
      type: this.actionTypes.updateReadTime,
      groupId,
      time,
    });
  }

  // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<({ text,... Remove this comment to see the full error message
  @proxify
  updatePostInput({ text, groupId, mentions }: any) {
    this.store.dispatch({
      type: this.actionTypes.updatePostInput,
      groupId,
      mentions,
      textValue: text,
    });
  }

  get postsMap() {
    return this.state.glipPostsStore;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get status() {
    return this.state.status;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get postInputs() {
    return this.state.postInputs;
  }

  get readTimeMap() {
    return this._storage.getItem(this._readTimeStorageKey);
  }

  get pageInfos() {
    return this.state.pageInfos;
  }

  get fetchTimeMap() {
    return this.state.fetchTimes;
  }

  get _hasPermission() {
    return !!this._extensionFeatures.features?.Glip?.available;
  }
}
