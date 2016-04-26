import accounts from './accounts';
import RingCentral from 'ringcentral';

export default {
  sdk: {
    ...accounts.app,
    server: accounts.apiServer
  },
  brand: {
    ...accounts.brand
  },
  user: {
    ...accounts.user
  }
}
