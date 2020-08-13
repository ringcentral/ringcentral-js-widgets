/// <reference path='../../../../ringcentral-js-widgets/test-utils/lib/global.d.ts'/>

declare module NodeJS {
  interface Global {
    instance: any;
    clientHistoryRequest: any;
  }
}
