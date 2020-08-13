import { computed, RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { directTransferNotificationTypes } from '../../enums/directTransferNotificationTypes';
import { makeCallsUniqueIdentifies } from '../../lib/callUniqueIdentifies';
import { contactMatchIdentifyEncode } from '../../lib/contactMatchIdentify';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { CallHistory, Deps } from './EvCallHistory.interface';

@Module({
  name: 'EvCallHistory',
  deps: [
    'EvCallMonitor',
    'EvSubscription',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ActivityMatcher', optional: true },
  ],
})
class EvCallHistory extends RcModuleV2<Deps> implements CallHistory {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._deps.contactMatcher?.addQuerySource({
      getQueriesFn: () => this.uniqueIdentifies,
      readyCheckFn: () => this._deps.evCallMonitor.ready,
    });
    this._deps.activityMatcher?.addQuerySource({
      getQueriesFn: () => this.callLogsIds,
      readyCheckFn: () => this._deps.evCallMonitor.ready,
    });
  }

  // TODO: dataMapping type
  get contactMatches(): any {
    return this._deps.contactMatcher.dataMapping || {};
  }

  get activityMatches() {
    return this._deps.activityMatcher.dataMapping || {};
  }

  get rawCalls() {
    return this._deps.evCallMonitor.callLogs;
  }

  get callLogsIds() {
    return this._deps.evCallMonitor.callLogsIds;
  }

  get callsMapping() {
    return this._deps.evCallMonitor.callsMapping;
  }

  @computed((that: EvCallHistory) => [
    that.rawCalls,
    that.contactMatches,
    that.activityMatches,
  ])
  get calls() {
    return this.rawCalls.map((call) => {
      const contactMatchIdentify = contactMatchIdentifyEncode({
        phoneNumber: call.ani,
        callType: call.callType,
      });
      const id = this._deps.evCallMonitor.getCallId(call.session);

      return {
        ...call,
        // TODO confirm about using `toMatches` & `fromMatches`?
        contactMatches: this.contactMatches[contactMatchIdentify] || [],
        activityMatches: this.activityMatches[id] || [],
      };
    });
  }

  @computed((that: EvCallHistory) => [that.calls])
  get lastEndedCall() {
    return this.calls.length > 0 ? this.calls[0] : null;
  }

  @computed((that: EvCallHistory) => [that.rawCalls])
  get uniqueIdentifies() {
    return makeCallsUniqueIdentifies(this.rawCalls);
  }

  onInitOnce() {
    this._deps.evSubscription.subscribe(
      EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF,
      (data) => {
        if (data.status === directTransferNotificationTypes.VOICEMAIL) {
          // TODO add `data` for list and alert message about 'Direct Transfer: data.ani, Click to view call detail.'
        }
      },
    );
  }
}

export { EvCallHistory };
