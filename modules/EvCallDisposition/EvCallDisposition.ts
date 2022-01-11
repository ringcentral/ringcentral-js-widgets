import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import {
  CallDisposition,
  Deps,
  EvCallDispositionMapping,
  EvDispositionStateMapping,
} from './EvCallDisposition.interface';

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
class EvCallDisposition extends RcModuleV2<Deps> implements CallDisposition {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvCallDisposition',
    });
  }

  @storage
  @state
  callsMapping: EvCallDispositionMapping = {};

  @storage
  @state
  dispositionStateMapping: EvDispositionStateMapping = {};

  @action
  setDisposition(id: string, data: EvCallDispositionMapping[string]) {
    this.callsMapping[id] = data;
  }

  @action
  removeDisposition(id: string) {
    delete this.callsMapping[id];
  }

  @action
  setDispositionState(id: string, disposed: EvDispositionStateMapping[string]) {
    this.dispositionStateMapping[id] = disposed;
  }

  onInitOnce() {
    this._deps.evCallMonitor.onCallAnswered((call) => {
      if (call.outdialDispositions) {
        const disposition = call.outdialDispositions.dispositions.find(
          ({ isDefault }) => isDefault,
        );
        const id = this._deps.evCallMonitor.getCallId(call.session);
        this.setDisposition(id, {
          dispositionId: disposition ? disposition.dispositionId : null,
          notes: '',
        });
      }
    });
  }

  disposeCall(id: string) {
    const call = this._deps.evCallHistory.callsMapping[id];
    const callDisposition = this.callsMapping[id];
    const isDisposed =
      this.dispositionStateMapping[id] &&
      this.dispositionStateMapping[id].disposed;
    if (!call.outdialDispositions || isDisposed) return;

    this._deps.evClient.dispositionCall({
      uii: call.uii,
      dispId: callDisposition.dispositionId,
      notes: callDisposition.notes,
    });

    this.setDispositionState(id, { disposed: true });
  }
}

export { EvCallDisposition };
