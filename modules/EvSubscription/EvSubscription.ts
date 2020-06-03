import { RcModuleV2 } from '@ringcentral-integration/core';
import EventEmitter from 'events';
import { Module } from 'ringcentral-integration/lib/di';
import {
  EvClientCallBackValueType,
  EvClientCallMapping,
} from '../../lib/EvClient/interfaces';
import { DepsModules, Subscription } from './EvSubscription.interface';

@Module({
  name: 'EvSubscription',
  deps: ['EvClient', { dep: 'EvSubscriptionOptions', optional: true }],
})
class EvSubscription extends RcModuleV2<DepsModules> implements Subscription {
  protected eventEmitters = new EventEmitter();

  constructor({ evClient }) {
    super({
      modules: {
        evClient,
      },
    });
  }

  emit<T extends EvClientCallBackValueType, K extends EvClientCallMapping[T]>(
    event: T,
    value: K,
  ) {
    this.eventEmitters.emit(event, value);
  }

  subscribe<
    T extends EvClientCallBackValueType,
    K extends EvClientCallMapping[T]
  >(event: T, listener: (data?: K) => any) {
    if (!this._modules.evClient.getEventCallback(event)) {
      this._modules.evClient.on(event, (...args: any[]) => {
        this.eventEmitters.emit(event, ...args);
      });
    }
    this.eventEmitters.on(event, listener);
  }
}

export { EvSubscription };
