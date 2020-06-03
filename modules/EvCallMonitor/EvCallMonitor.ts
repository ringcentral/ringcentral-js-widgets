import { RcModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import { Mapping } from 'ringcentral-widgets/typings';
import { EvCallData } from '../../interfaces/EvData.interface';
import { makeCallsUniqueIdentifies } from '../../lib/callUniqueIdentifies';
import { contactMatchIdentifyEncode } from '../../lib/contactMatchIdentify';
import { EvAddSessionNotification } from '../../lib/EvClient/interfaces';
import { CallMonitor, DepsModules } from './EvCallMonitor.interface';

@Module({
  name: 'EvCallMonitor',
  deps: [
    'Presence',
    'EvClient',
    'EvSessionConfig',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ActivityMatcher', optional: true },
  ],
})
class EvCallMonitor extends RcModuleV2<DepsModules> implements CallMonitor {
  private _oldCalls: EvCallData[];

  private _onCallEndedHooks: Set<() => void>;

  private _onCallRingHooks: Set<() => void>;

  public handleActivityMatch: () => void;

  constructor({
    presence,
    evClient,
    evSessionConfig,
    contactMatcher,
    activityMatcher,
  }) {
    super({
      modules: {
        presence,
        evClient,
        evSessionConfig,
        contactMatcher,
        activityMatcher,
      },
    });
    this._oldCalls = [];
    this._onCallRingHooks = new Set();
    this._onCallEndedHooks = new Set();
    if (this._modules.contactMatcher) {
      this._modules.contactMatcher.addQuerySource({
        getQueriesFn: () => this.getUniqueIdentifies(),
        readyCheckFn: () => this._modules.presence.ready,
      });
      this.addCallRingHook(async () => {
        const call = this.getCallsMapping()[this.callIds[0]];
        const contactMatchIdentify = contactMatchIdentifyEncode({
          phoneNumber: call.ani,
          callType: call.callType.toLowerCase(),
        });
        await this._modules.contactMatcher.forceMatchNumber({
          phoneNumber: contactMatchIdentify,
        });
        if (this.handleActivityMatch) {
          this.handleActivityMatch();
        }
      });
    }

    if (this._modules.activityMatcher) {
      this._modules.activityMatcher.addQuerySource({
        getQueriesFn: () => this.callIds,
        readyCheckFn: () => this._modules.presence.ready,
      });
    }
  }

  get isOnCall() {
    return this.calls.length > 0;
  }

  get calls() {
    return this._modules.presence.getCalls() || [];
  }

  get otherCalls() {
    return this._modules.presence.getOtherCalls() || [];
  }

  get callLogs() {
    return this._modules.presence.getCallLogs() || [];
  }

  get callIds() {
    return this._modules.presence.callIds || [];
  }

  get otherCallIds() {
    return this._modules.presence.otherCallIds || [];
  }

  get callLogsIds() {
    return this._modules.presence.callLogsIds || [];
  }

  get callsDataMapping() {
    return this._modules.presence.callsMapping || {};
  }

  get contactMatches(): Mapping<any[]> {
    return (this._modules.contactMatcher.dataMapping as any) || {};
  }

  get activityMatches() {
    return this._modules.activityMatcher.dataMapping || {};
  }

  getCallsMapping = createSelector(
    () => this.callsDataMapping,
    () => this.contactMatches,
    () => this.activityMatches,
    (callsDataMapping, contactMatches, activityMatches) => {
      return Object.entries(callsDataMapping).reduce((mapping, [key, call]) => {
        const contactMatchIdentify = contactMatchIdentifyEncode({
          phoneNumber: call.ani,
          callType: call.callType.toLowerCase(),
        });
        const id = call.session ? this.getCallId(call.session) : null;
        const { agentFirstName, agentLastName } = call.baggage || {};
        const agentName =
          agentFirstName && agentLastName
            ? `${agentFirstName} ${agentLastName}`
            : null;
        return {
          ...mapping,
          [key]: {
            ...call,
            agentName,
            // TODO confirm about using `toMatches` & `fromMatches`?
            contactMatches: contactMatches[contactMatchIdentify] || [],
            activityMatches:
              id && activityMatches[id] ? activityMatches[id] : [],
          } as EvCallData,
        };
      }, {});
    },
  );

  getUniqueIdentifies = createSelector(
    () => this.calls,
    (calls) => makeCallsUniqueIdentifies(calls),
  );

  onStateChange() {
    if (this.calls.length > this._oldCalls.length) {
      this._oldCalls = this.calls;
      if (this.calls.length > 0 && this.calls[0]) {
        this.onCallRing();
      }
    } else if (this.calls.length < this._oldCalls.length) {
      this._oldCalls = this.calls;
      this.onCallEnded();
    }
  }

  getCallId({ uii, sessionId }: Partial<EvAddSessionNotification>) {
    return this._modules.evClient.encodeUii({ uii, sessionId });
  }

  getActiveCallList(
    callIds: string[],
    otherCallIds: string[],
    callsMapping: Mapping<EvCallData>,
    id: string,
  ) {
    const uii = this._modules.evClient.decodeUii(id);
    const mainUii = this._modules.evClient.getMainId(uii);
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
    return this._modules.activityMatcher.match({
      queries: this._modules.activityMatcher._getQueries(),
      ignoreCache: forceMatch,
    });
  }

  private beforeunloadHandler = (event: BeforeUnloadEvent) => {
    if (this._modules.evSessionConfig.hasMultipleTabs) {
      // Guarantee the browser unload by removing the returnValue property of the event
      delete event.returnValue;
    } else {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  private async onCallRing() {
    window.addEventListener('beforeunload', this.beforeunloadHandler);
    for (const hook of this._onCallRingHooks) {
      await hook();
    }
  }

  private async onCallEnded() {
    window.removeEventListener('beforeunload', this.beforeunloadHandler);
    for (const hook of this._onCallEndedHooks) {
      await hook();
    }
  }

  public addCallRingHook(callback: () => any) {
    this._onCallRingHooks.add(callback);
    return this;
  }

  public removeCallRingHook(callback: () => any) {
    this._onCallRingHooks.delete(callback);
  }

  public addCallEndedHook(callback: () => any) {
    this._onCallEndedHooks.add(callback);
    return this;
  }

  public removeCallEndedHook(callback: () => any) {
    this._onCallEndedHooks.delete(callback);
  }
}

export { EvCallMonitor };
