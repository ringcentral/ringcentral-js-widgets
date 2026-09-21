type GlobalWithProcess = typeof globalThis & {
  process?: {
    env?: {
      NODE_ENV?: string;
    };
  };
};

export const getNodeEnv = () =>
  (globalThis as GlobalWithProcess).process?.env?.NODE_ENV;
