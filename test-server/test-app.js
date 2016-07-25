import RcPhone from '../src/rc-phone';
import config from '../config';

const phone = new RcPhone({
  sdkSettings: {
    ...config.sdk,
  },
  defaultBrand: {
    ...config.brand,
  },
});
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
