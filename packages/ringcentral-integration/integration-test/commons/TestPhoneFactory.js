import { createStore } from 'redux';
import uuid from 'uuid';
import { createPhone } from './Phone';
import apiConfig from './config/apiConfig';
import getBrandConfig from './config/brandConfig';

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
