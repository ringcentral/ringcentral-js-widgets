import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import DialerUI from '../DialerUI';
import actionTypes from './actionTypes';
import getReducer from './getReducer';

@Module()
export default class ConferenceDialerUI extends DialerUI {
  constructor({
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });

    this._storageKey = 'ConferenceDialerUIData';
    this._reducer = getReducer(this.actionTypes);
  }

  @proxify
  async setLastSessionId(sessionId) {
    if (this.lastSessionId !== sessionId) {
      this.clearRecipient();
      this.clearToNumberField();
    }
    this.store.dispatch({
      type: this.actionTypes.setLastSessionId,
      sessionId,
    });
  }

  get lastSessionId() {
    return this.state.lastSessionId;
  }
}
