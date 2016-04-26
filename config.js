import accounts from './accounts';

export default {
  sdk: {
    ...accounts.app,
    server: accounts.apiServer,
  },
  brand: {
    ...accounts.brand,
  },
  user: {
    ...accounts.user,
  },
};
