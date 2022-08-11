import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, RcModuleV2, watch } from '@ringcentral-integration/core';

import { directTransferNotificationTypes } from '../../enums/directTransferNotificationTypes';
import { makeCallsUniqueIdentifies } from '../../lib/callUniqueIdentifies';
import { contactMatchIdentifyEncode } from '../../lib/contactMatchIdentify';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { formatPhoneNumber } from '../../lib/FormatPhoneNumber';
import { CallHistory, Deps } from './EvCallHistory.interface';

@Module({
  name: 'EvCallHistory',
  deps: [
    'EvCallMonitor',
    'EvSubscription',
    'Locale',
    'EvAgentSession',
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

  get contactMatches() {
    // TODO: create EvContactMatcher with specific entity type instead of ContactMatcher in Phone DI
    return (this._deps.contactMatcher.dataMapping || {}) as {
      [key: string]: { id: string; name: string; type: string }[];
    };
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
  get formattedCalls() {
    return this.rawCalls.slice(0, 250).map((call) => {
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
        phoneNumber: this._formatPhoneNumber(call.agentId),
      };

      const contact = {
        name: this._formatPhoneNumber(call.ani),
        phoneNumber: this._formatPhoneNumber(call.ani),
      };

      const from = direction === callDirection.outbound ? agent : contact;
      const to = direction === callDirection.outbound ? contact : agent;

      return {
        id,
        direction,
        agent,
        contact,
        from,
        to,
        fromName: from.name,
        toName: to.name,
        fromMatches: contactMatches,
        toMatches: contactMatches,
        activityMatches,
        startTime: call.timestamp,
        isDisposed: false,
      };
    });
  }

  private _formatPhoneNumber(phoneNumber: string) {
    // TODO: support countryCode
    return formatPhoneNumber({
      phoneNumber,
      countryCode: 'US',
      currentLocale: this._deps.locale.currentLocale,
    });
  }

  @computed((that: EvCallHistory) => [that.formattedCalls])
  get lastEndedCall() {
    return this.formattedCalls.length > 0 ? this.formattedCalls[0] : null;
  }

  @computed((that: EvCallHistory) => [that.rawCalls])
  get uniqueIdentifies() {
    return makeCallsUniqueIdentifies(this.rawCalls);
  }

  override onInitOnce() {
    this._deps.evSubscription.subscribe(
      EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF,
      (data) => {
        if (data.status === directTransferNotificationTypes.VOICEMAIL) {
          // TODO: add `data` for list and alert message about 'Direct Transfer: data.ani, Click to view call detail.'
        }
      },
    );

    watch(
      this,
      () => this._deps.evAgentSession.configSuccess,
      (configSuccess) => {
        if (
          configSuccess &&
          !this._deps.evCallMonitor.callsLimited &&
          !this._deps.evCallMonitor.calls.length
        ) {
          this._deps.evCallMonitor.limitCalls();
        }
      },
    );
  }
}

export { EvCallHistory };
