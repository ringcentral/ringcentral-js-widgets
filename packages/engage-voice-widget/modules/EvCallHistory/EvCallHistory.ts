import { RcModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { directTransferNotificationTypes } from '../../enums/directTransferNotificationTypes';
import { makeCallsUniqueIdentifies } from '../../lib/callUniqueIdentifies';
import { contactMatchIdentifyEncode } from '../../lib/contactMatchIdentify';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { CallHistory, DepsModules } from './EvCallHistory.interface';

@Module({
  name: 'EvCallHistory',
  deps: [
    'EvCallMonitor',
    'EvSubscription',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ActivityMatcher', optional: true },
  ],
})
class EvCallHistory extends RcModuleV2<DepsModules> implements CallHistory {
  constructor({
    evCallMonitor,
    evSubscription,
    contactMatcher,
    activityMatcher,
  }) {
    super({
      modules: {
        evCallMonitor,
        evSubscription,
        contactMatcher,
        activityMatcher,
      },
    });
    if (this._modules.contactMatcher) {
      this._modules.contactMatcher.addQuerySource({
        getQueriesFn: () => this.getUniqueIdentifies(),
        readyCheckFn: () => this._modules.evCallMonitor.ready,
      });
    }

    if (this._modules.activityMatcher) {
      this._modules.activityMatcher.addQuerySource({
        getQueriesFn: () => this.callLogsIds,
        readyCheckFn: () => this._modules.evCallMonitor.ready,
      });
    }
  }

  get contactMatches() {
    return this._modules.contactMatcher.dataMapping || {};
  }

  get activityMatches() {
    return this._modules.activityMatcher.dataMapping || {};
  }

  get rawCalls() {
    return this._modules.evCallMonitor.callLogs;
  }

  get callLogsIds() {
    return this._modules.evCallMonitor.callLogsIds;
  }

  get callsMapping() {
    return this._modules.evCallMonitor.getCallsMapping();
  }

  getCalls = createSelector(
    () => this.rawCalls,
    () => this.contactMatches,
    () => this.activityMatches,
    (calls, contactMatches, activityMatches) => {
      return calls.map((call) => {
        const contactMatchIdentify = contactMatchIdentifyEncode({
          phoneNumber: call.ani,
          callType: call.callType.toLowerCase(),
        });
        const id = this._modules.evCallMonitor.getCallId(call.session);
        return {
          ...call,
          // TODO confirm about using `toMatches` & `fromMatches`?
          contactMatches: contactMatches[contactMatchIdentify] || [],
          activityMatches: activityMatches[id] || [],
        };
      });
    },
  );

  getLastEndedCall = createSelector(
    () => this.getCalls(),
    (calls) => {
      return calls.length > 0 ? calls[0] : null;
    },
  );

  getUniqueIdentifies = createSelector(
    () => this.rawCalls,
    (calls) => makeCallsUniqueIdentifies(calls),
  );

  onInitOnce() {
    this._modules.evSubscription.subscribe(
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
