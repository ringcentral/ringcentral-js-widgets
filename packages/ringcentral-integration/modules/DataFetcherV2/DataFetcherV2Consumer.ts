import { EventEmitter } from 'events';

import { RcModuleV2, watch } from '@ringcentral-integration/core';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { DataFetcherV2ConsumerBaseDeps } from './DataFetcherV2Consumer.interface';
import { DataSource } from './DataSource';
import { sourceStatus } from './sourceStatus';

export const baseEvents = ObjectMap.fromKeys(['dataReady']);

export abstract class DataFetcherV2Consumer<
  D extends DataFetcherV2ConsumerBaseDeps,
  T,
> extends RcModuleV2<D> {
  // @ts-expect-error
  protected _source: DataSource<T>;
  protected _emitter = new EventEmitter();

  get data() {
    return this._deps.dataFetcherV2.getData(this._source);
  }

  get events() {
    return baseEvents;
  }

  override onInitOnce() {
    watch(
      this,
      () => [this.ready, this.data],
      ([ready, data]) => {
        if (ready && data) {
          this._emitter.emit(this.events.dataReady);
        }
      },
      {
        multiple: true,
      },
    );
  }

  on(...args: Parameters<EventEmitter['on']>) {
    return this._emitter.on(...args);
  }

  off(...args: Parameters<EventEmitter['off']>) {
    return this._emitter.off(...args);
  }

  override _shouldInit() {
    return !!(
      super._shouldInit() &&
      this._deps.dataFetcherV2.getSourceStatus(this._source) ===
        sourceStatus.ready
    );
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready &&
        this._deps.dataFetcherV2.getSourceStatus(this._source) !==
          sourceStatus.ready)
    );
  }

  async fetchData() {
    if (this.ready) {
      return this._deps.dataFetcherV2.fetchData(this._source);
    }
  }
}
