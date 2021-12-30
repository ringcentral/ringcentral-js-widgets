declare module NodeJS {
  interface Global {
    URL: {
      revokeObjectURL: Function;
      createObjectURL: Function;
    };
  }
}

declare const JSX: any;

interface Window {
  analytics: any;
}
