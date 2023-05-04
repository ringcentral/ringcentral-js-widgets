declare module NodeJS {
  interface Global {
    URL: {
      revokeObjectURL: Function;
      createObjectURL: Function;
    };
    analytics: any;
  }
}
