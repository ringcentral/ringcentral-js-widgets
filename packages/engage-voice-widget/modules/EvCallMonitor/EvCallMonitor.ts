import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, RcModuleV2 } from '@ringcentral-integration/core';
import type { Mapping } from '@ringcentral-integration/widgets/typings';

import { callStatus } from '../../enums';
import type { EvCallData } from '../../interfaces/EvData.interface';
import { makeCallsUniqueIdentifies } from '../../lib/callUniqueIdentifies';
import { contactMatchIdentifyEncode } from '../../lib/contactMatchIdentify';
import type { EvAddSessionNotification } from '../../lib/EvClient/interfaces';
import type { CallMonitor, Deps } from './EvCallMonitor.interface';

@Module({
  name: 'EvCallMonitor',
  deps: [
    'Presence',
    'EvClient',
    'Beforeunload',
    'EvAgentSession',
    'EvIntegratedSoftphone',
    'EvCallDataSource',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ActivityMatcher', optional: true },
  ],
})
class EvCallMonitor extends RcModuleV2<Deps> implements CallMonitor {
  private _oldCalls: EvCallData[] = [];

  private _beforeunloadHandler = () =>
    this._deps.evAgentSession.shouldBlockBrowser;

  constructor(deps: Deps) {
    super({
      deps,
    });

    this._deps.contactMatcher?.addQuerySource({
      getQueriesFn: () => this.uniqueIdentifies,
      readyCheckFn: () => this._deps.presence.ready,
    });
    this._deps.activityMatcher?.addQuerySource({
      getQueriesFn: () => this.callIds,
      readyCheckFn: () => this._deps.presence.ready,
    });
  }

  async getMatcher({ ani, callType }: EvCallData) {
    if (this._deps.contactMatcher) {
      const contactMatchIdentify = contactMatchIdentifyEncode({
        phoneNumber: ani,
        callType,
      });
      await this._deps.contactMatcher.forceMatchNumber({
        phoneNumber: contactMatchIdentify,
      });
    }
  }

  get isOnCall() {
    return this.calls.length > 0;
  }

  get calls() {
    return this._deps.presence.calls || [];
  }

  get otherCalls() {
    return this._deps.presence.otherCalls || [];
  }

  get callLogs() {
    return this._deps.presence.callLogs || [];
  }

  get callIds() {
    return this._deps.presence.callIds || [];
  }

  get otherCallIds() {
    return this._deps.presence.otherCallIds || [];
  }

  get callLogsIds() {
    return this._deps.presence.callLogsIds || [];
  }

  get callsDataMapping() {
    return this._deps.presence.callsMapping || {};
  }

  get contactMatches(): Mapping<any[]> {
    return (this._deps.contactMatcher.dataMapping as any) || {};
  }

  get activityMatches() {
    return this._deps.activityMatcher.dataMapping || {};
  }

  @computed((that: EvCallMonitor) => [
    that.callsDataMapping,
    that.contactMatches,
    that.activityMatches,
  ])
  get callsMapping() {
    const { callsDataMapping, contactMatches, activityMatches } = this;

    return Object.entries(callsDataMapping).reduce<Mapping<EvCallData>>(
      (mapping, [key, call]) => {
        const contactMatchIdentify = contactMatchIdentifyEncode({
          phoneNumber: call.ani,
          callType: call.callType,
        });

        const id = call.session ? this.getCallId(call.session) : null;
        const recordingUrl = call.session?.recordingUrl;
        const { agentFirstName, agentLastName } = call.baggage || {};

        const agentName =
          agentFirstName && agentLastName
            ? `${agentFirstName} ${agentLastName}`
            : null;

        return {
          ...mapping,
          [key]: {
            ...call,
            recordingUrl,
            agentName,
            // TODO: confirm about using `toMatches` & `fromMatches`?
            contactMatches: contactMatches[contactMatchIdentify] || [],
            activityMatches:
              id && activityMatches[id] ? activityMatches[id] : [],
          } as EvCallData,
        };
      },
      {},
    );
  }

  @computed((that: EvCallMonitor) => [that.calls])
  get uniqueIdentifies() {
    return makeCallsUniqueIdentifies(this.calls);
  }

  getMainCall(uii: string) {
    const id = this._deps.evClient.getMainId(uii);
    return this._deps.presence.callsMapping[id];
  }

  get callsLimited() {
    return this._deps.evCallDataSource.callsLimited;
  }

  limitCalls() {
    return this._deps.evCallDataSource.limitCalls();
  }

  override onStateChange() {
    if (this._deps.evAgentSession.configSuccess) {
      if (this.calls.length > this._oldCalls.length) {
        const currentCall = this.calls[0];
        const mainCall = this.getMainCall(currentCall.uii);

        if (currentCall && mainCall) {
          this._oldCalls = this.calls;

          this._deps.presence.eventEmitter.emit(
            callStatus.ANSWERED,
            currentCall,
          );
        } else {
          this._deps.presence.clearCalls();
        }
      } else if (this.calls.length < this._oldCalls.length) {
        const call = this._oldCalls[0];
        this._oldCalls = this.calls;

        this._deps.presence.eventEmitter.emit(callStatus.ENDED, call);
      }
    }
  }

  getCallId({ uii, sessionId }: Partial<EvAddSessionNotification>) {
    return this._deps.evClient.encodeUii({ uii, sessionId });
  }

  getActiveCallList(
    callIds: string[],
    otherCallIds: string[],
    callsMapping: Mapping<EvCallData>,
    id: string,
  ) {
    const uii = this._deps.evClient.decodeUii(id);
    const mainUii = this._deps.evClient.getMainId(uii);
    if (!otherCallIds.includes(mainUii) || !callIds.includes(id)) return [];
    const currentOtherCallIds = otherCallIds.filter(
      (id) => id.includes(uii) && id !== mainUii,
    );
    const currentCallIds = [mainUii, id, ...currentOtherCallIds];
    return currentCallIds.map((id) => callsMapping[id]);
  }

  updateActivityMatches({ forceMatch = false } = {}) {
    // it's async function
    // TODO: fix type in DataMatcher
    return this._deps.activityMatcher.match({
      queries: this._deps.activityMatcher._getQueries(),
      ignoreCache: forceMatch,
    });
  }

  onCallRinging(callback: (session?: EvAddSessionNotification) => any) {
    this._deps.presence.eventEmitter.on(callStatus.RINGING, callback);
    return this;
  }

  onCallAnswered(callback: (currentCall?: EvCallData) => any) {
    this._deps.presence.eventEmitter.on(callStatus.ANSWERED, callback);
    return this;
  }

  onCallEnded(callback: (currentCall?: EvCallData) => any) {
    this._deps.presence.eventEmitter.on(callStatus.ENDED, callback);
    return this;
  }

  bindBeforeunload() {
    this._deps.beforeunload.add(this._beforeunloadHandler);
  }

  removeBeforeunload() {
    this._deps.beforeunload.remove(this._beforeunloadHandler);
  }
}

export { EvCallMonitor };
