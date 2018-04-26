import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import getFeedbackReducer from './getFeedbackReducer';
import getCacheReducer from './getCacheReducer';
import actionTypes from './actionTypes';
import moduleStatuses from '../../enums/moduleStatuses';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description user feedback module
 */
@Module({
  deps: [
    'Auth',
    'Storage',
  ]
})

export default class Feedback extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   */
  constructor({
    auth,
    storage,
    ...options,
  }) {
    super({
      ...options,
      actionTypes
    });
    this._auth = auth;
    this._storageKey = 'feedback';
    this._storage = storage;
    this._reducer = getFeedbackReducer(this.actionTypes);
    this._cacheReducer = getCacheReducer(this.actionTypes);
    this._storage.registerReducer({ key: this._storageKey, reducer: this._cacheReducer });
  }
  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }
  _onStateChange() {
    if (this._auth.ready && this._storage.ready && !this.ready) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    } else if ((!this._auth.ready || !this._storage.ready) && this.ready) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }

  @proxify
  updateEmail(email) {
    this.store.dispatch({
      type: this.actionTypes.updateEmail,
      value: email,
    });
  }

  @proxify
  updateTopic(topic) {
    this.store.dispatch({
      type: this.actionTypes.updateTopic,
      value: topic,
    });
  }

  @proxify
  updateSubject(subjectText) {
    this.store.dispatch({
      type: this.actionTypes.updateSubject,
      value: subjectText,
    });
  }

  @proxify
  updateDescription(descriptionText) {
    this.store.dispatch({
      type: this.actionTypes.updateDescription,
      value: descriptionText,
    });
  }

  @proxify
  clean() {
    this.store.dispatch({
      type: this.actionTypes.clean
    });
  }

  @proxify
  sendFeedback(mailToUrl) {
    window.location.href = mailToUrl;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get data() {
    return this._storage.getItem(this._storageKey);
  }

  get email() {
    return this.data.email;
  }

  get topic() {
    return this.data.topic;
  }

  get subject() {
    return this.data.subject;
  }

  get description() {
    return this.data.description;
  }
}
