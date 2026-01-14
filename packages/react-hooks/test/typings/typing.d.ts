/// <reference path='../../../test-utils/lib/global.d.ts'/>

declare const global: typeof globalThis & {
  instance: {
    app: any;
    rcMock: any;
    example?: any;
    payload: {
      //
    };
  };
};
