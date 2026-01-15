/* eslint-disable no-var */
import type { connect } from 'mock-mcp';

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
  var mockMcpClient: Awaited<ReturnType<typeof connect>>;
  var checkModules: (...args: any[]) => any;
  var traceModules: (...args: any[]) => any;

  interface Window {
    analytics: any;
    /**
     * by default after each will clean up all the websocket connections, if you want to keep it, set this to `true`
     */
    wsCleanDisabled: boolean;
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
    /**
     * auto purge all the data after each test
     */
    autoPurge?: boolean;
    /**
     * make sure all storage be write done be for each test
     */
    autoFlush?: boolean;
    serverRunner?: any;
    contentRunner: any;
  };
}
