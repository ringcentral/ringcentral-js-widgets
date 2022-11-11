import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import { isBlank } from '../../lib/isBlank';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { actionTypes } from './actionTypes';
import getReducer, { getGlipPostsReadTimeReducer } from './getReducer';
import { status } from './status';

const glipPostsRegExp = /glip\/posts$/;
const glipGroupRegExp = /glip\/groups$/;

const subscriptionFilter = '/restapi/v1.0/glip/posts';

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
export default class GlipPosts extends RcModule {
  constructor({
    client,
    auth,
    subscription,
    storage,
    extensionFeatures,
    loadTtl = DEFAULT_LOAD_TTL,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._reducer = getReducer(this.actionTypes);

    this._client = ensureExist.call(this, client, 'client');
    this._auth = ensureExist.call(this, auth, 'auth');
    this._extensionFeatures = extensionFeatures;
    this._subscription = ensureExist.call(this, subscription, 'subscription');
    this._fetchPromises = {};
    this._lastMessage = null;
    this._loadTtl = loadTtl;

    this._storage = storage;
    this._readTimeStorageKey = 'glipPostReadTime';
    this._storage.registerReducer({
      key: this._readTimeStorageKey,
      reducer: getGlipPostsReadTimeReducer(this.actionTypes),
    });
    this._newPostListeners = [];
  }

  addNewPostListener(listen) {
    if (typeof listen === 'function') {
      this._newPostListeners.push(listen);
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
      if (!this._hasPermission) return;
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      this._subscription.subscribe([subscriptionFilter]);
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
      this._fetchPromises = {};
    } else if (this._shouldHandleSubscriptionMessage()) {
      this._processSubscription();
    }
  }

  override _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._subscription.ready &&
      this._extensionFeatures.ready &&
      this.pending
    );
  }

  override _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._extensionFeatures.ready ||
        !this._subscription.ready) &&
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

  _processSubscription() {
    const { message } = this._subscription;
    this._lastMessage = message;
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
        this._newPostListeners.forEach((listen) => {
          listen(post);
        });
      }
    }
  }

  @proxify
  async loadPosts(groupId, recordCount = 20) {
    const lastPosts = this.postsMap[groupId];
    const fetchTime = this.fetchTimeMap[groupId];
    if (lastPosts && fetchTime && Date.now() - fetchTime < this._loadTtl) {
      return;
    }
    await this.fetchPosts(groupId, recordCount);
  }

  @proxify
  async fetchPosts(groupId, recordCount = 20, pageToken) {
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
  async loadNextPage(groupId, recordCount) {
    const pageInfo = this.pageInfos[groupId];
    const pageToken = pageInfo && pageInfo.prevPageToken;
    if (!pageToken) {
      return;
    }
    await this.fetchPosts(groupId, recordCount, pageToken);
  }

  @proxify
  async create({ groupId }) {
    let text = this.postInputs[groupId] && this.postInputs[groupId].text;
    const mentions =
      this.postInputs[groupId] && this.postInputs[groupId].mentions;
    if (isBlank(text) || !groupId) {
      return;
    }
    if (mentions && mentions.length > 0) {
      mentions.forEach((mention) => {
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
  async sendFile({ fileName, groupId, rawFile }) {
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

  @proxify
  updateReadTime(groupId, time) {
    this.store.dispatch({
      type: this.actionTypes.updateReadTime,
      groupId,
      time,
    });
  }

  @proxify
  updatePostInput({ text, groupId, mentions }) {
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

  get status() {
    return this.state.status;
  }

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
