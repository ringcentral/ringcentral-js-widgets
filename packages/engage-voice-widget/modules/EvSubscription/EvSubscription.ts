import { RcModuleV2 } from '@ringcentral-integration/core';
import { EventEmitter } from 'events';
import { Module } from '@ringcentral-integration/commons/lib/di';

import {
  EvClientCallBackValueType,
  EvClientCallMapping,
} from '../../lib/EvClient/interfaces';
import { Deps, Subscription } from './EvSubscription.interface';

@Module({
  name: 'EvSubscription',
  deps: ['EvClient', { dep: 'EvSubscriptionOptions', optional: true }],
})
class EvSubscription extends RcModuleV2<Deps> implements Subscription {
  protected eventEmitters = new EventEmitter();

  constructor(deps: Deps) {
    super({
      deps,
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
    if (!this._deps.evClient.getEventCallback(event)) {
      this._deps.evClient.on(event, (...args: any[]) => {
        this.eventEmitters.emit(event, ...args);
      });
    }
    this.eventEmitters.on(event, listener);
    return this;
  }

  once<T extends EvClientCallBackValueType, K extends EvClientCallMapping[T]>(
    event: T,
    listener: (data?: K) => any,
  ) {
    this.eventEmitters.once(event, listener);
  }

  off<T extends EvClientCallBackValueType, K extends EvClientCallMapping[T]>(
    event: T,
    listener: (data?: K) => any,
  ) {
    this.eventEmitters.off(event, listener);
  }
}

export { EvSubscription };
