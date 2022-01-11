import { filter } from 'ramda';

import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, UIFunctions, UIProps } from '@ringcentral-integration/core';

import { ActiveCallsUI } from '../ActiveCallsUI';
import {
  CallsOnholdContainerProps,
  CallsOnholdPanelProps,
  Deps,
} from './CallsOnholdUI.interface';

@Module({
  name: 'CallsOnholdUI',
  deps: ['RouterInteraction', { dep: 'CallsOnholdUIOptions', optional: true }],
})
export class CallsOnholdUI extends ActiveCallsUI<Deps> {
  fromSessionId?: string;

  @computed((that: CallsOnholdUI) => [
    that._deps.callMonitor.calls,
    that.fromSessionId,
  ])
  get calls() {
    return filter(
      (call) =>
        call.webphoneSession &&
        !this._deps.conferenceCall.isConferenceSession(
          call.webphoneSession.id,
        ) &&
        call.webphoneSession.id !== this.fromSessionId,
      this._deps.callMonitor.calls,
    );
  }

  getUIProps(
    options: CallsOnholdContainerProps,
  ): UIProps<CallsOnholdPanelProps> {
    this.fromSessionId = options.params.fromSessionId;
    return {
      ...super.getUIProps(options),
      calls: this.calls,
    };
  }

  getUIFunctions(
    options: CallsOnholdContainerProps,
  ): UIFunctions<CallsOnholdPanelProps> {
    return {
      ...super.getUIFunctions(options),
      onMerge: async (sessionId) => {
        // to track user click merge
        this._deps.callMonitor.callsOnHoldClickMergeTrack();

        const sessions = await this._deps.conferenceCall.parseMergingSessions({
          sessionId,
          sessionIdToMergeWith: options.params.fromSessionId,
        });
        if (sessions) {
          const confId =
            this._deps.conferenceCall.conferences &&
            Object.keys(this._deps.conferenceCall.conferences)[0];
          if (confId) {
            const confSessionId =
              this._deps.conferenceCall.conferences[confId].sessionId;
            this._deps.routerInteraction.push(`/calls/active/${confSessionId}`);
          } else {
            this._deps.routerInteraction.goBack();
          }
          await this._deps.conferenceCall.mergeSessions(sessions);
        }
      },
      onBackButtonClick: () => {
        if (this._deps.webphone.sessions.length) {
          this._deps.routerInteraction.goBack();
          return;
        }
        this._deps.routerInteraction.go(-2);
      },
      onAdd: () => {
        // to track use click add button
        this._deps.callMonitor.callsOnHoldClickAddTrack();
        this._deps.routerInteraction.push(
          `/conferenceCall/dialer/${options.params.fromNumber}/${options.params.fromSessionId}`,
        );
      },
      getAvatarUrl: options.getAvatarUrl,
      webphoneHangup: async (sessionId) => {
        // track user click hangup on calls onhold page
        this._deps.callMonitor.callsOnHoldClickHangupTrack();
        return this._deps.webphone && this._deps.webphone.hangup(sessionId);
      },
    };
  }
}
