import RcPhone from './src/rc-phone';
import config from './config';

const phone = new RcPhone({
  sdkSettings: {
    ...config.sdk,
  },
  defaultBrand: {
    ...config.brand,
  },
});
phone.auth.login({
  ...config.user,
});

export default phone;
