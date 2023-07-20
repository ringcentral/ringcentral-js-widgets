/* eslint-disable no-var */
export {};

declare global {
  /**
   * specific log that you want to show when `DEBUG=log`
   */
  const log: (...params: any[]) => void;
  /**
   * debug preview re-render when use `jest-preview`
   */
  const debugPreview: () => void;

  var app: any;
  var checkModules: (...args: any[]) => any;
  var traceModules: (...args: any[]) => any;

  interface Window {
    analytics: any;
  }

  var URL: {
    revokeObjectURL: (url: string) => void;
    createObjectURL: (url: string) => void;
  };

  var instance: {
    app: any;
    rcMock: any;
    example?: any;
    payload: {
      //
    };
    autoLogout?: boolean;
  };
}
