/// <reference path='../../../../ringcentral-js-widgets/test-utils/lib/global.d.ts'/>

declare namespace NodeJS {
  interface Global {
    instance: any;
    clientHistoryRequest: any;
    toggleEnv: () => void;
  }
}
