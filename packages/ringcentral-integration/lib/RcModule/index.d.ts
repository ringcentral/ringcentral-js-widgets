/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = RcModule;

/*~ Write your module's methods and properties in this class */
declare class RcModule {
  [x: string]: any;
  constructor(getState?: any, getProxyState?: any, prefix?: string, actionTypes?: Enum);

  private _prefix: string;
  private _prefixedActionTypes: any;
  protected _reducer: any;
  private _proxyReducer: any;
  private _modulePath: string;
  private _selectors: any;
  private _actionTypes: any;
  private _getState: any;
  state: any;
  store: any;
  proxyState: any;
  reducer: any;
  proxyReducer: any;
  prefix: any;
  actionTypes: any;
  modulePath: any;
  addModule( name: string, module: any): void;
  setStore(store): void;
  private _setStore(store): void;
  initialize(): void;
  private _onStateChange(): any;
  private _initModule(): void;
  create():any;
  status: any;
  ready: boolean;
  pending: boolean;
  proxyStatus: boolean;
  proxyReady: boolean;
  proxyPending: boolean;
}
