import { Store } from 'redux';
import { ModuleActionTypes } from '../../enums/moduleActionTypes';

/* ~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */

interface RcModuleOptions<T> {
  getState?: any;
  getProxyState?: any;
  prefix?: string;
  actionTypes?: T & ModuleActionTypes;
}

/* ~ Write your module's methods and properties in this class */
declare class RcModule<T = any> {
  // [x: string]: any;
  constructor(options: any);

  private _prefix: string;
  private _prefixedActionTypes: any;
  protected _reducer: any;
  private _proxyReducer: any;
  private _modulePath: string;
  private _selectors: any;
  _actionTypes: T & ModuleActionTypes;
  private _getState: any;
  state: any;
  store: Store;
  proxyState: any;
  reducer: any;
  proxyReducer: any;
  prefix: any;
  actionTypes: T & ModuleActionTypes;
  modulePath: any;
  addModule(name: string, module: any): void;
  setStore(store): void;
  private _setStore(store): void;
  initialize(): void;
  protected _onStateChange(): any;
  private _initModule(): void;
  create(): any;
  status: any;
  ready: boolean;
  pending: boolean;
  proxyStatus: boolean;
  proxyReady: boolean;
  proxyPending: boolean;
}

export = RcModule;
