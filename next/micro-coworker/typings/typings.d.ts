/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/// <reference path='../../libs/next-core/typings/typings.d.ts'/>

export {};

declare global {
  const config: any;
  var __rc_shared_worker__: { url: string; worker: SharedWorker };
  var __rc_coworker__: { url: string; worker: SharedWorker };
}
