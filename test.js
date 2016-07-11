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
phone.user.login({
  ...config.user,
});

// export default phone;
