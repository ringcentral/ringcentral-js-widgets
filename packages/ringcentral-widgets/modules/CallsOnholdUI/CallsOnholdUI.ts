import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { computed } from '@ringcentral-integration/core';
import { filter } from 'ramda';

import { ActiveCallsUI } from '../ActiveCallsUI';

import type {
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
        if (!this._deps.conferenceCall) {
          console.warn(
            '[CallsOnholdUI] _deps.conferenceCall is mandatory for merging calls.',
          );
          return;
        }
        const sessions = await this._deps.conferenceCall.parseMergingSessions({
          sessionId,
          sessionIdToMergeWith: options.params.fromSessionId,
        });
        if (sessions?.session) {
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
          await this._deps.conferenceCall.mergeSessions({
            session: sessions.session,
            sessionToMergeWith: sessions.sessionToMergeWith,
          });
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
