import { RcModuleV2 } from '../RcModule';

export abstract class RcUIModuleV2<
  T extends Record<string, any> = {},
> extends RcModuleV2<T> {
  /**
   * TODO:
   * * better getUIProps and getUIFunctions typing: This is changed back from Record<string, any>
   *   and Record<string, Function> to just any. This is done because a fix shaped object does not
   *   equate to type Record<string, any>. Record<string, any> means that this object can change in
   *   shape, with keys added or removed from it. But UIProps and UIFunctions object does not qualify
   *   that.
   *   I propose to use the following implementation later:
   *   abstract class RcUIModuleV2<T = {}, ComponentProps> extends RcModuleV2<T> {
   *     abstract getUIProps(...args: any[]): UIProps<ComponentProps>;
   *     abstract getUIFunctions(...args: any[]): UIFunctions<ComponentProps>;
   *   }
   */
  abstract getUIProps(...args: any[]): any;
  abstract getUIFunctions(...args: any[]): any;
}
