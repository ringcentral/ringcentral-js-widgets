import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import {
  action,
  state,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { DialerUI } from '../DialerUI';
import {
  ConferenceDialerUIContainerProps,
  ConferenceDialerUIPanelProps,
  Deps,
} from './ConferenceDialerUI.interface';

@Module({
  name: 'ConferenceDialerUI',
  deps: [
    'Locale',
    'ConferenceCall',
    'RouterInteraction',
    { dep: 'ConferenceDialerUIOptions', optional: true },
  ],
})
export class ConferenceDialerUI extends DialerUI<Deps> {
  private get _backURL() {
    return this._deps.conferenceDialerUIOptions?.backURL || '/calls/active';
  }

  @state
  lastSessionId: string = '';

  @action
  _setLastSessionId(val: string) {
    this.lastSessionId = val;
  }

  @proxify
  async setLastSessionId(sessionId: string) {
    if (this.lastSessionId !== sessionId) {
      this.clearRecipient();
      this.clearToNumberField();
    }

    this._setLastSessionId(sessionId);
  }

  override _onBeforeCall(fromSessionId: string) {
    if (
      this._deps.conferenceCall &&
      fromSessionId &&
      !this._deps.conferenceCall.mergingPair?.fromSessionId
    ) {
      // set mergingPair if has
      this._deps.conferenceCall.setMergeParty({
        fromSessionId,
      });
    }
  }

  override getUIProps(): UIProps<ConferenceDialerUIPanelProps> {
    return {
      ...super.getUIProps(),
      inConference: true,
      showFromField: false,
    };
  }

  override getUIFunctions(
    props: ConferenceDialerUIContainerProps,
  ): UIFunctions<ConferenceDialerUIPanelProps> {
    const {
      params: { fromNumber, fromSessionId },
    } = props;
    return {
      ...super.getUIFunctions(props),
      onBack: () => this._deps.routerInteraction.push(this._backURL),
      setLastSessionId: () => this.setLastSessionId(fromSessionId!),
      onCallButtonClick: () =>
        this.onCallButtonClick({ fromNumber, fromSessionId }),
    };
  }
}
