import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import moduleStatuses from '../../enums/moduleStatuses';

import isBlank from '../../lib/isBlank';

import actionTypes from './actionTypes';
import getReducer from './getReducer';
import status from './status';

const glipPostsRegExp = /glip\/posts$/;
const subscriptionFilter = '/glip/posts';

@Module({
  deps: [
    'Client',
    'Auth',
    'Subscription',
    { dep: 'GlipPostsOptions', optional: true }
  ]
})
export default class GlipPosts extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Subscription} params.subscription - subscription module instance
   */
  constructor({
    client,
    auth,
    subscription,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._reducer = getReducer(this.actionTypes);

    this._client = client;
    this._auth = auth;
    this._subscription = subscription;
    this._fetchPromises = {};
    this._lastMessage = null;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      this._subscription.subscribe(subscriptionFilter);
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
      this._fetchPromises = {};
    } else if (this._shouldSubscribe()) {
      this._processSubscription();
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._subscription.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._auth.loggedIn ||
        !this._subscription.ready
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

  _processSubscription() {
    const { message } = this._subscription;
    this._lastMessage = message;
    if (
      message &&
      glipPostsRegExp.test(message.event) &&
      message.body
    ) {
      const {
        eventType,
        ...post,
      } = message.body;
      if (eventType === 'PostRemoved') {
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.createSuccess,
        groupId: post.groupId,
        record: post,
        oldRecordId: post.id,
        isSendByMe: (post.creatorId === this._auth.ownerId && eventType === 'PostAdded')
      });
    }
  }

  async loadPosts(groupId, recordCount = 20) {
    if (!groupId) {
      return;
    }
    if (!this._fetchPromises[groupId]) {
      this._fetchPromises[groupId] = (async () => {
        try {
          this.store.dispatch({
            type: this.actionTypes.fetch,
          });
          const response = await this._client.glip().groups(groupId).posts().list({ recordCount });
          this.store.dispatch({
            type: this.actionTypes.fetchSuccess,
            groupId,
            records: response.records,
          });
        } catch (e) {
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

  async create({ groupId }) {
    const text = this.postInputs[groupId] && this.postInputs[groupId].text;
    if (isBlank(text) || !groupId) {
      return;
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
      this.updatePostInput({ text: '', groupId });
      const record = await this._client.glip().groups(groupId).posts().post({
        text,
      });
      this.store.dispatch({
        type: this.actionTypes.createSuccess,
        groupId,
        record,
        oldRecordId: fakeId,
      });
    } catch (e) {
      fakeRecord.sendStatus = status.createError;
      this.store.dispatch({
        type: this.actionTypes.createError,
        record: fakeRecord,
        groupId,
        oldRecordId: fakeId,
      });
      this.updatePostInput({ text, groupId });
    }
  }

  async sendFile({ fileName, groupId, rawFile }) {
    try {
      const platform = this._client.service.platform();
      const body = rawFile;
      const response = await platform.post(
        '/glip/files',
        body,
        { groupId, name: fileName },
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          }
        }
      );
      return response.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  updatePostInput({ text, groupId }) {
    this.store.dispatch({
      type: this.actionTypes.updatePostInput,
      groupId,
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
}
