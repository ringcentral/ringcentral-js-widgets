/// <reference path='../../../node_modules/@types/pendo-io-browser/index.d.ts' name="pendo"/>
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */

export {};

declare global {
  var app: any;
  var checkModules: (...args: any[]) => any;
  var traceModules: (...args: any[]) => any;
  var __rc_shared_worker__: {
    url: string;
    worker: SharedWorker;
  };
  var __rc_coworker__: {
    url: string;
    worker: SharedWorker;
  };
}
