/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */

export {};

declare global {
  var app: any;
  var checkModules: (...args: any[]) => any;
  var traceModules: (...args: any[]) => any;
}
