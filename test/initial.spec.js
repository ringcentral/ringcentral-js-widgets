import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getWrapper } from './shared';

let wrapper = null;
beforeEach(() => {
  wrapper = getWrapper();
});

describe('initial test', () => {
  test('initial state', () => {
    expect(wrapper).toBeDefined();
    const provider = wrapper.find(Provider).first();
    expect(provider).toBeDefined();
    const router = provider.find(Router).first();
    expect(router).toBeDefined();
  });
});
