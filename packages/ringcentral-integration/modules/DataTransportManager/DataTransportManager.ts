import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { createTransport } from '../../lib/dataTransport';
import type {
  CustomKeyNameMap,
  Deps,
  IDataTransportManager,
  TransportMap,
  TransportMapParams,
  Transports,
} from './DataTransportManager.interface';
@Module({
  name: 'DataTransportManager',
})
export class DataTransportManager<T extends keyof CustomKeyNameMap>
  extends RcModuleV2<Deps>
  implements IDataTransportManager<T>
{
  private _transportMap: TransportMap<T> = new Map();
  constructor(deps: Deps) {
    super({
      deps,
    });
  }
  addTransport(params: TransportMapParams<T>): void {
    const { key, name, options } = params;
    this._transportMap.set(key, createTransport(name, options));
  }
  getItem(key: T): Transports[CustomKeyNameMap[T]] {
    return this._transportMap.get(key) as Transports[CustomKeyNameMap[T]];
  }
  deleteTransport(key: T) {
    this._transportMap.delete(key);
  }
}
