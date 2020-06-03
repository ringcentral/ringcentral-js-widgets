import {
  action,
  RcModuleV2,
  state,
  storage,
  RcModuleState,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  CallDisposition,
  DepsModules,
  State,
  EvDispositionStateMapping,
  EvCallDispositionMapping,
} from './EvCallDisposition.interface';

type EvCallDispositionState = RcModuleState<EvCallDisposition, State>;

@Module({
  name: 'EvCallDisposition',
  deps: [
    'Storage',
    'EvCallMonitor',
    'EvCallHistory',
    'EvClient',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'EvCallDispositionOptions', optional: true },
  ],
})
class EvCallDisposition extends RcModuleV2<DepsModules, EvCallDispositionState>
  implements CallDisposition {
  constructor({
    evCallMonitor,
    evCallHistory,
    contactMatcher,
    activityMatcher,
    storage,
    evClient,
    enableCache = true,
  }) {
    super({
      modules: {
        storage,
        evCallMonitor,
        evCallHistory,
        contactMatcher,
        activityMatcher,
        evClient,
      },
      enableCache,
      storageKey: 'EvCallDisposition',
    });
    // TODO: when init need check, if still have call calling
    this._modules.evCallMonitor.addCallRingHook(() => {
      const [call] = this._modules.evCallMonitor.calls;
      if (call?.outdialDispositions) {
        const disposition = call.outdialDispositions.dispositions.find(
          ({ isDefault }) => isDefault,
        );
        const id = this._modules.evCallMonitor.getCallId(call.session);
        this.changeDisposition(id, {
          dispositionId: disposition ? disposition.dispositionId : null,
          notes: '',
        });
      }
    });
  }

  @storage
  @state
  callsMapping: EvCallDispositionMapping = {};

  @storage
  @state
  dispositionStateMapping: EvDispositionStateMapping = {};

  @action
  changeDisposition(id, data) {
    this.state.callsMapping[id] = data;
  }

  @action
  removeDisposition(id) {
    delete this.state.callsMapping[id];
  }

  @action
  changeDispositionState(id, disposed) {
    this.state.dispositionStateMapping[id] = { disposed };
  }

  disposeCall(id: string) {
    const call = this._modules.evCallHistory.callsMapping[id];
    const callDisposition = this.callsMapping[id];
    const isDisposed =
      this.dispositionStateMapping[id] &&
      this.dispositionStateMapping[id].disposed;
    if (!call.outdialDispositions || isDisposed) return;
    this._modules.evClient.dispositionCall({
      uii: call.uii,
      dispId: callDisposition.dispositionId,
      notes: callDisposition.notes,
    });
    this.changeDispositionState(id, { disposed: true });
  }
}

export { EvCallDisposition };
