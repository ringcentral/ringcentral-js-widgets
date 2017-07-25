import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getWrapper, getState } from './shared';
import CallsPanel from '../src/components/CallsPanel';
import NavigationBar from '../src/components/NavigationBar';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  wrapper = getWrapper();
  const navigationBar = wrapper.find(Provider).first()
    .find(Router).first()
    .find(NavigationBar)
    .first();
  await navigationBar.props().goTo('/history');
  panel = wrapper.find(Provider).first()
    .find(Router).first()
    .find(CallsPanel)
    .first();
});

describe('history', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });
});
