import { createStore } from 'redux';
import * as uuid from 'uuid';

import apiConfig from './config/apiConfig';
import getBrandConfig from './config/brandConfig';
import { createPhone } from './Phone';

export default function getTestPhone() {
  const testPhone = createPhone({
    apiConfig,
    brandConfig: getBrandConfig(),
    prefix: uuid.v4(),
  });
  const store = createStore(testPhone.reducer);
  testPhone.setStore(store);
  return testPhone;
}
