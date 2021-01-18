import moment from 'moment';
import { computed, RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import { callDirection } from 'ringcentral-integration/enums/callDirections';

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
    const lastWeekDayTimestamp = this._getLastWeekDayTimestamp();
    // max 250 and 7 days
    const calls = this.rawCalls
      .slice(0, 250)
      .filter((call) => call.timestamp >= lastWeekDayTimestamp);

    return calls.map((call) => {
      const contactMatchIdentify = contactMatchIdentifyEncode({
        phoneNumber: call.ani,
        callType: call.callType,
      });

      const id = this._deps.evCallMonitor.getCallId(call.session);
      const direction =
        call.callType.toLowerCase() === 'outbound'
          ? callDirection.outbound
          : callDirection.inbound;
      const contactMatches = this.contactMatches[contactMatchIdentify] || [];
      const activityMatches = this.activityMatches[id] || [];
      const agent = {
        name: call.agentId,
        phoneNumber: call.agentId,
      };

      let name = '';
      if (contactMatches.length && activityMatches.length) {
        const activity = activityMatches[0];
        const matched = contactMatches.find(
          (match: { id: string }) => match.id === activity,
        );
        if (matched) {
          name = matched.name;
        }
      }
      const contact = {
        name,
        phoneNumber: call.ani,
      };

      return {
        id,
        direction,
        from: direction === callDirection.outbound ? agent : contact,
        to: direction === callDirection.outbound ? contact : agent,
        fromName:
          direction === callDirection.outbound
            ? agent.name || agent.phoneNumber
            : contact.name || contact.phoneNumber,
        toName:
          direction === callDirection.outbound
            ? contact.name || contact.phoneNumber
            : agent.name || agent.phoneNumber,
        fromMatches: contactMatches,
        toMatches: contactMatches,
        activityMatches,
        startTime: call.timestamp,
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

  private _getLastWeekDayTimestamp() {
    const now = moment();
    const lastWeekDay = now.clone().subtract(7, 'days').startOf('day');
    return lastWeekDay.valueOf();
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
