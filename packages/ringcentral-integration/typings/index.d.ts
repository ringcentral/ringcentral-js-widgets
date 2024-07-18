/* eslint-disable no-var */

export {};

interface LockManager {
  request(name: string, callback: () => any): Promise<any>;
  request(name: string, options: any, callback: () => any): Promise<any>;
  query(): Promise<any>;
}

declare interface Navigator {
  locks?: LockManager;
}

interface Window {
  mixpanel: any;
}

declare global {
  /** proxy object for APIs */
  var apiProxy: { chrome?: typeof chrome; browser?: any } | undefined;
}
