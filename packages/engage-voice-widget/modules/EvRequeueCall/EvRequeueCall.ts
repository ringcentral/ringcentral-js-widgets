import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import { requeueEvents } from '../../enums';
import { EvCallData } from '../../interfaces/EvData.interface';
import { EvTypeError } from '../../lib/EvTypeError';
import { Deps, RequeueCall } from './EvRequeueCall.interface';

type EvRequeueCallStatus = Partial<
  Pick<
    EvRequeueCall,
    'selectedQueueGroupId' | 'selectedGateId' | 'stayOnCall' | 'requeuing'
  >
>;

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
class EvRequeueCall extends RcModuleV2<Deps> implements RequeueCall {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
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

  @computed((that: EvRequeueCall) => [
    that._deps.evCall.currentCall,
    that._deps.evAuth.agentPermissions.allowCrossQueueRequeue,
  ])
  get allowRequeueCall() {
    const { currentCall } = this._deps.evCall;
    let result = true;
    if (currentCall && !currentCall.endedCall) {
      if (!currentCall.allowRequeue) {
        result = false;
      } else if (
        !this._deps.evAuth.agentPermissions.allowCrossQueueRequeue &&
        currentCall.callType === 'OUTBOUND' &&
        currentCall.requeueType === 'ADVANCED'
      ) {
        result = false;
      } else if (!this._hasRequeueQueues(currentCall)) {
        result = false;
      }
    }
    return result;
  }

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
      loadingId = await this._deps.alert.info({
        message: requeueEvents.START,
        loading: true,
      });

      const result = await this._deps.evClient.requeueCall({
        maintain: this.stayOnCall,
        queueId: this.selectedGateId,
      });

      if (result.status === 'FAILURE') {
        throw new EvTypeError({ type: 'Requeue' });
      }
      if (this.stayOnCall) {
        await this._deps.activeCallControl.hold();
      }
      this._deps.alert.success({ message: requeueEvents.SUCCESS });
    } catch (error) {
      this._deps.alert.danger({
        message: requeueEvents.FAILURE,
      });
      throw new EvTypeError({ type: requeueEvents.FAILURE });
    } finally {
      this.setStatus({ requeuing: false });
      this._deps.alert.dismiss(loadingId);
    }
  }

  private _hasRequeueQueues(currentCall: EvCallData) {
    let result = false;
    if (currentCall.requeueType === 'ADVANCED') {
      const queues = this._deps.evAuth.availableQueues;
      result = queues && queues.length > 0;
    } else {
      const shortcuts = currentCall.requeueShortcuts;
      result = shortcuts && shortcuts.length > 0;
    }

    return result;
  }
}

export { EvRequeueCall };
