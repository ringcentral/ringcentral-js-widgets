import { createMockStore } from 'redux-logic-test';

import Phone from './Phone';

const phone = new Phone({
  brandConfig: { name: 'RingCentral' },
  appVersion: '0.0.1',
});

const store = createMockStore({
  initialState: {},
  reducer: phone.reducer
});

phone.setStore(store);

export default phone;
