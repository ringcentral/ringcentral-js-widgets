import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getWrapper, getState } from './shared';
import CallsPanel from '../src/components/CallsPanel';
import NavigationBar from '../src/components/NavigationBar';

let wrapper = null;
beforeEach(() => {
  wrapper = getWrapper();
});

describe('history', () => {
  test('switch to history panel', async () => {
    const navigationBar = wrapper.find(Provider).first()
    .find(Router).first()
    .find(NavigationBar)
    .first();
    await navigationBar.props().goTo('/history');
    const panel = wrapper.find(Provider).first()
    .find(Router).first()
    .find(CallsPanel)
    .first();
    expect(panel).toBeDefined();
    expect(panel.props).toBeDefined();
  });
});
