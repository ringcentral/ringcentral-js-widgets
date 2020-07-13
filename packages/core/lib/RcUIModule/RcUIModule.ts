import { RcModuleV2 } from '../RcModule';

export abstract class RcUIModuleV2<T = {}, K = {}> extends RcModuleV2<T, K> {
  abstract getUIProps(...args: any[]): Record<string, any>;
  abstract getUIFunctions(
    ...args: any[]
  ): Record<string, (...args: any[]) => any>;
}
