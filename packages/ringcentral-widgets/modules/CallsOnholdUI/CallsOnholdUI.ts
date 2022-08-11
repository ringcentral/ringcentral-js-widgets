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
        // @ts-expect-error TS(2769): No overload matches this call.
        call.webphoneSession &&
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        !this._deps.conferenceCall.isConferenceSession(
          call.webphoneSession.id,
        ) &&
        call.webphoneSession.id !== this.fromSessionId,
      this._deps.callMonitor.calls,
    );
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  getUIProps(
    options: CallsOnholdContainerProps,
  ): UIProps<CallsOnholdPanelProps> {
    this.fromSessionId = options.params.fromSessionId;
    return {
      ...super.getUIProps(options),
      calls: this.calls,
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  getUIFunctions(
    options: CallsOnholdContainerProps,
  ): UIFunctions<CallsOnholdPanelProps> {
    return {
      ...super.getUIFunctions(options),
      onMerge: async (sessionId) => {
        // to track user click merge
        this._deps.callMonitor.callsOnHoldClickMergeTrack();

        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const sessions = await this._deps.conferenceCall.parseMergingSessions({
          sessionId,
          sessionIdToMergeWith: options.params.fromSessionId,
        });
        if (sessions) {
          const confId =
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            this._deps.conferenceCall.conferences &&
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            Object.keys(this._deps.conferenceCall.conferences)[0];
          if (confId) {
            const confSessionId =
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.conferenceCall.conferences[confId].sessionId;
            this._deps.routerInteraction.push(`/calls/active/${confSessionId}`);
          } else {
            this._deps.routerInteraction.goBack();
          }
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          await this._deps.conferenceCall.mergeSessions(sessions);
        }
      },
      onBackButtonClick: () => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
