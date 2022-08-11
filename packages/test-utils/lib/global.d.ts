declare module NodeJS {
  interface Global {
    URL: {
      revokeObjectURL: Function;
      createObjectURL: Function;
    };
  }
}

/**
 * specific log that you want to show when `DEBUG=log`
 */
declare function log(params: string): void;

/**
 * debug preview re-render when use `jest-preview`
 */
declare function debugPreview(): void;

interface Window {
  analytics: any;
}
