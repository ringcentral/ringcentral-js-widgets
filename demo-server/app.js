import RcPhone from '../src/rc-phone';
import config from '../config';
import { createStore } from 'redux';

let resolver = null;
let store = null;
const phone = new RcPhone({
  sdkSettings: {
    ...config.sdk,
  },
  defaultBrand: {
    ...config.brand,
  },
  promiseForStore: new Promise((resolve) => {
    resolver = resolve;
  }),
  getState: () => store.getState(),
});
store = createStore(phone.reducer);
resolver(store);

phone.subscription.subscribe(phone.subscription.events.telephony);

phone.subscription.on(phone.subscription.events.telephony, msg => {
  console.log('check: ', msg);
});
(async () => {
  if (! await phone.auth.isLoggedIn()) {
    phone.auth.login({
      ...config.user,
    });
  }
})();

window.phone = phone;
