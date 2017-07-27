import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getWrapper, getState, timeout } from './shared';
import NavigationBar from '../src/components/NavigationBar';
import ComposeTextPanel from '../src/components/ComposeTextPanel';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(Provider).first()
    .find(Router).first()
    .find(NavigationBar)
    .first();
  await navigationBar.props().goTo('/composeText');
  panel = wrapper.find(Provider).first()
    .find(Router).first()
    .find(ComposeTextPanel)
    .first();
});

describe('compose text panel', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    // expect(panel).toMatchSnapshot();
  });

  test('send button status', () => {
    // todo: need to login first
  });
});
