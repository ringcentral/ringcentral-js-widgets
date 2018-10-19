import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import DialerUI from '../DialerUI';
import actionTypes from './actionTypes';
import getReducer from './getReducer';

@Module({
  name: 'ConferenceDialerUI',
  deps: [
    'ConferenceCall',
  ],
})
export default class ConferenceDialerUI extends DialerUI {
  constructor({
    conferenceCall,
    ...options,
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._conferenceCall = conferenceCall;
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

  _onBeforeCall(fromSessionId) {
    if (
      fromSessionId &&
      this._conferenceCall.mergingPair &&
      !this._conferenceCall.mergingPair.fromSessionId
    ) {
      // set mergingPair if has
      this._conferenceCall.setMergeParty({
        fromSessionId
      });
    }
  }
}
