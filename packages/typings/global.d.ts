declare namespace NodeJS {
  interface Global {
    URL: {
      revokeObjectURL: Function;
      createObjectURL: Function;
    };
    analytics: any;
  }
}
