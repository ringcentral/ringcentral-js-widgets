import {
  BrowserExtensionsGenericTransport,
  BrowserExtensionsMainTransport,
  BrowserExtensionsClientTransport,
  BrowserExtensionsGenericTransportOptions,
  BrowserExtensionsMainTransportOptions,
  BrowserExtensionsClientTransportOptions,
} from 'data-transport';

export interface Transports {
  BrowserExtensions: BrowserExtensionsGenericTransport;
  BrowserExtensionsMain: BrowserExtensionsMainTransport;
  BrowserExtensionsClient: BrowserExtensionsClientTransport;
}
export interface TransportOptionsMap {
  BrowserExtensions: BrowserExtensionsGenericTransportOptions;
  BrowserExtensionsMain: BrowserExtensionsMainTransportOptions;
  BrowserExtensionsClient: BrowserExtensionsClientTransportOptions;
}
export interface CustomKeyNameMap {
  extensionClient: 'BrowserExtensionsClient';
  genericExtensionClient: 'BrowserExtensions';
}
export type TransportMap<T extends keyof CustomKeyNameMap> = Map<
  T,
  Transports[CustomKeyNameMap[T]]
>;
export interface TransportMapParams<T extends keyof CustomKeyNameMap> {
  key: T;
  name: CustomKeyNameMap[T];
  options: TransportOptionsMap[CustomKeyNameMap[T]];
}

export interface Deps {}
export interface IDataTransportManager<T extends keyof CustomKeyNameMap> {
  addTransport(params: TransportMapParams<T>): void;
  getItem(key: T): Transports[CustomKeyNameMap[T]];
  deleteTransport(key: T): void;
}
