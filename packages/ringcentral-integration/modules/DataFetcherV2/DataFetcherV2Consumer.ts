import { RcModuleV2 } from '@ringcentral-integration/core';
import { DataSource } from './DataSource';
import { sourceStatus } from './sourceStatus';
import { DataFetcherV2ConsumerBaseDeps } from './DataFetcherV2Consumer.interface';

export abstract class DataFetcherV2Consumer<
  D extends DataFetcherV2ConsumerBaseDeps,
  T
> extends RcModuleV2<D> {
  protected _source: DataSource<T>;
  get data() {
    return this._deps.dataFetcherV2.getData(this._source);
  }

  _shouldInit() {
    return !!(
      super._shouldInit() &&
      this._deps.dataFetcherV2.getSourceStatus(this._source) ===
        sourceStatus.ready
    );
  }

  _shouldReset() {
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
