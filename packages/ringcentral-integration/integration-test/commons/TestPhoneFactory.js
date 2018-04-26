import { createStore } from 'redux';
import Phone from './Phone';
import apiConfig from './config/apiConfig';
import getBrandConfig from './config/brandConfig';
import uuid from 'uuid';

export default function getTestPhone() {
  const testPhone = new Phone({
    ...apiConfig,
    ...getBrandConfig(),
    prefix: uuid.v4()
  });
  const store = createStore(testPhone.reducer);
  testPhone.setStore(store);
  return testPhone;
}
