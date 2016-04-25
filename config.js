import accounts from './accounts';
import RingCentral from 'ringcentral';

export default {
  sdk: {
    ...accounts.app,
    server: RingCentral.server.sandbox
  },
  brand: {
    ...accounts.brand
  },
  user: {
    ...accounts.user
  }
}
