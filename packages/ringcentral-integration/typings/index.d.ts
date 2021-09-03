interface LockManager {
  request(name: string, callback: Function): Promise<any>;
  request(name: string, options: any, callback: Function): Promise<any>;
  query(): Promise<any>;
}

declare interface Navigator {
  locks?: LockManager;
}
