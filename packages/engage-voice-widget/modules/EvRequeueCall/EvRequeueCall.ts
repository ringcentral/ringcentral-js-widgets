import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { requeueEvents } from '../../enums';
import { EvCallData } from '../../interfaces/EvData.interface';
import { EvTypeError } from '../../lib/EvTypeError';
import { DepsModules, RequeueCall, State } from './EvRequeueCall.inerface';

type EvRequeueCallStatus = Partial<
  Pick<
    EvRequeueCall,
    'selectedQueueGroupId' | 'selectedGateId' | 'stayOnCall' | 'requeuing'
  >
>;

type EvRequeueCallState = RcModuleState<EvRequeueCall, State>;

@Module({
  name: 'EvRequeueCall',
  deps: [
    'EvClient',
    'EvCall',
    'Storage',
    'ActiveCallControl',
    'EvAuth',
    'Alert',
    { dep: 'EvRequeueCallOptions', optional: true },
  ],
})
class EvRequeueCall extends RcModuleV2<DepsModules, EvRequeueCallState>
  implements RequeueCall {
  constructor({
    evClient,
    storage,
    activeCallControl,
    evCall,
    evAuth,
    alert,
    enableCache = true,
  }) {
    super({
      modules: {
        evClient,
        storage,
        activeCallControl,
        evCall,
        evAuth,
        alert,
      },
      enableCache,
      storageKey: 'EvRequeueCall',
    });
  }

  @storage
  @state
  selectedQueueGroupId: string = '';

  @storage
  @state
  selectedGateId: string = '';

  @storage
  @state
  stayOnCall: boolean = false;

  @storage
  @state
  requeuing: boolean = false;

  getAllowRequeueCall = createSelector(
    () => this._modules.evCall.getCurrentCall(),
    (currentCall) => {
      let result = true;
      if (currentCall && !currentCall.endedCall) {
        if (!currentCall.allowRequeue) {
          result = false;
        } else if (
          !this._modules.evAuth.agentPermissions.allowCrossQueueRequeue &&
          currentCall.callType === 'OUTBOUND' &&
          currentCall.requeueType === 'ADVANCED'
        ) {
          result = false;
        } else if (!this._hasRequeueQueues(currentCall)) {
          result = false;
        }
      }
      return result;
    },
  );

  @action
  setStatus({
    selectedQueueGroupId,
    selectedGateId,
    stayOnCall,
    requeuing,
  }: EvRequeueCallStatus) {
    this.selectedQueueGroupId =
      selectedQueueGroupId ?? this.selectedQueueGroupId;
    this.selectedGateId = selectedGateId ?? this.selectedGateId;
    this.stayOnCall = stayOnCall ?? this.stayOnCall;
    this.requeuing = requeuing ?? this.requeuing;
  }

  async requeueCall() {
    let loadingId: string;
    try {
      this.setStatus({ requeuing: true });
      loadingId = this._modules.alert.info({
        message: requeueEvents.START,
        loading: true,
      });

      const result = await this._modules.evClient.requeueCall({
        maintain: this.stayOnCall,
        queueId: this.selectedGateId,
      });

      if (result.status === 'FAILURE') {
        throw new EvTypeError({ type: 'Requeue' });
      }
      if (this.stayOnCall) {
        await this._modules.activeCallControl.hold();
      }
      this._modules.alert.success({ message: requeueEvents.SUCCESS });
    } catch (error) {
      this._modules.alert.danger({
        message: requeueEvents.FAILURE,
      });
      throw new EvTypeError({ type: requeueEvents.FAILURE });
    } finally {
      this.setStatus({ requeuing: false });
      this._modules.alert.dismiss(loadingId);
    }
  }

  private _hasRequeueQueues(currentCall: EvCallData) {
    let result = false;
    if (currentCall.requeueType === 'ADVANCED') {
      const queues = this._modules.evAuth.availableQueues;
      result = queues && queues.length > 0;
    } else {
      const shortcuts = currentCall.requeueShortcuts;
      result = shortcuts && shortcuts.length > 0;
    }

    return result;
  }
}

export { EvRequeueCall };
