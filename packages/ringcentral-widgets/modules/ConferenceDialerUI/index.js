import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import Enum from 'ringcentral-integration/lib/Enum';

import DialerUI from '../DialerUI';
import getReducer from './getReducer';

@Module({
  name: 'ConferenceDialerUI',
  deps: ['ConferenceCall', 'RouterInteraction'],
})
export default class ConferenceDialerUI extends DialerUI {
  constructor({
    conferenceCall,
    routerInteraction,
    backURL = '/calls/active',
    ...options
  }) {
    super({
      ...options,
    });
    this._conferenceCall = conferenceCall;
    this._routerInteraction = routerInteraction;
    this._backURL = backURL;
    this._reducer = getReducer(this.actionTypes);
  }

  get _actionTypes() {
    return new Enum(
      [...Object.keys(super._actionTypes), 'setLastSessionId'],
      'conferenceDialerUI',
    );
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
        fromSessionId,
      });
    }
  }

  getUIProps() {
    return {
      ...super.getUIProps(),
      showFromField: false,
    };
  }

  getUIFunctions({ params: { fromNumber, fromSessionId } }) {
    return {
      ...super.getUIFunctions(),
      onBack: () => this._routerInteraction.push(this._backURL),
      setLastSessionId: () => this.setLastSessionId(fromSessionId),
      onCallButtonClick: () =>
        this.onCallButtonClick({ fromNumber, fromSessionId }),
      inConference: true,
    };
  }
}
