import { RcModuleV2 } from '../RcModule';

export abstract class RcUIModuleV2<T = {}> extends RcModuleV2<T> {
  abstract getUIProps(...args: any[]): Record<string, any>;

  abstract getUIFunctions(...args: any[]): any;
}
